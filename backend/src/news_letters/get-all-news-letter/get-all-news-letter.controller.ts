import {
	Controller,
	Get,
	HttpStatus,
	Query
} from '@nestjs/common'
import {
	ApiOperation,
	ApiQuery,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import { newsLetterToJson } from '~features/news_letter/application/news_letter_mapper'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { GetAllNewsLetterService } from './get-all-news-letter.service'

@ApiTags( 'news-letters' )
@Controller( 'news-letters' )
export class GetAllNewsLetterController {
	constructor( private readonly getAllNewsLetterService: GetAllNewsLetterService,
		private readonly translation: TranslationService
	)
	{}

	@Get()
	@ApiQuery( {
		name    : 'name',
		type    : String,
		required: false
	} )
	@ApiOperation( {
		summary    : 'Get all news letter',
		description: 'Get all news letter from a range, and optionally filter by name'
	} )
	@ApiResponse( {
		status : 200,
		content: {
			'application/json': {
				schema: {
					type      : 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 200
						},
						data      : {
							type : 'array',
							items: {
								type      : 'object',
								properties: {
									email          : {
										type   : 'string',
										example: 'string'
									},
									name          : {
										type   : 'string',
										example: 'string'
									},
									created_at          : {
										type   : 'string',
										example: 'date'
									},
								}
							}
						}
					}
				}
			}
		}
	} )
	@ApiResponse( {
		status : 400,
		content: {
			'application/json': {
				schema: {
					type      : 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 400
						},
						message   : {
							type      : 'object',
							properties: {
								code_error: {
									type   : 'string',
									example: 'error translation'
								}
							}
						}
					}
				}
			}
		}
	} )
	@ApiResponse( {
		status     : 500,
		description: 'Internal server error by external operations',
		content    : {
			'application/json': {
				schema: {
					type      : 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 500
						}
					}
				}
			}
		}
	} )
	async getAllNewsLetter(
		@Query( 'from' ) from: number,
		@Query( 'to' ) to: number,
		@Query( 'name' ) name?: string
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {

			const { data } = this.parseGetAllNewsLetter( {
				from,
				to,
				name
			} )

			const newsLetters = await this.getAllNewsLetterService.getAllNewsLetter(
				data.from,
				data.to,
				data.name
			)

			const json = newsLetters.map(
				newsLetter => newsLetterToJson( newsLetter ) )

			return {
				data      : json,
				statusCode: HttpStatus.OK
			}
		}
		catch ( e ) {
			return {
				statusCode: HttpStatus.BAD_REQUEST,
				message   : this.translation.translateAll( e )
			}
		}
	}

	parseGetAllNewsLetter( dto: {
		from: number,
		to: number,
		name?: string,
	} ): {
		data: {
			from: ValidInteger
			to: ValidInteger
			name?: ValidString
		}
	}
	{
		const errors: BaseException[] = []

		const from = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.from ) )

		if ( from instanceof InvalidIntegerException ) {
			errors.push( new InvalidIntegerException( 'from' ) )
		}

		const to = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.to ) )

		if ( to instanceof InvalidIntegerException ) {
			errors.push( new InvalidIntegerException( 'to' ) )
		}

		const name = dto.name === undefined
			? undefined
			: wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( dto.name ?? '' ) )

		if ( name != undefined && name instanceof InvalidStringException ) {
			errors.push( new InvalidStringException( 'name' ) )
		}

		if ( errors.length > 0 ) {
			throw errors
		}

		return {
			data: {
				from: from as ValidInteger,
				to  : to as ValidInteger,
				name: name as ValidString
			}
		}
	}
}
