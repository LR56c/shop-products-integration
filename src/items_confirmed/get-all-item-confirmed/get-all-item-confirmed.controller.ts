import {
	Controller,
	Get,
	HttpStatus,
	Query
} from '@nestjs/common'
import {
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { itemConfirmedToJson } from 'packages/item_confirmed/application/item_confimed_mapper'
import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from 'packages/shared/domain/exceptions/InvalidIntegerException'
import { ValidInteger } from 'packages/shared/domain/value_objects/valid_integer'
import { wrapType } from 'packages/shared/utils/wrap_type'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetAllItemConfirmedService } from './get-all-item-confirmed.service'

@ApiTags( 'items-confirmed' )
@Controller( 'items-confirmed' )
export class GetAllItemConfirmedController {
	constructor( private readonly getAllItemConfirmedService: GetAllItemConfirmedService,
		private readonly translation: TranslationService )
	{}

	@Get()
	@ApiOperation( {
		summary    : 'Get all items confirmed',
		description: 'Get all items confirmed from a range of dates'
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
									id               : {
										type   : 'string',
										example: 'uuid'
									},
									created_at       : {
										type   : 'string',
										example: 'date'
									},
									shop_keeper_email: {
										type   : 'string',
										example: 'email'
									}
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
	async getAll(
		@Query( 'from' ) from: number,
		@Query( 'to' ) to: number
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {

			const ordersConfirmed = await this.getAllItemConfirmedService.execute(
				from, to )

			let json: Record<string, any>[] = []
			for ( const o of ordersConfirmed ) {
				json.push( itemConfirmedToJson( o ) )
			}

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

	parseGetAllItemConfirmed( dto: {
		from: number,
		to: number,
	} ): {
		data: {
			from: ValidInteger
			to: ValidInteger
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

		if ( errors.length > 0 ) {
			throw errors
		}

		return {
			data: {
				from: from as ValidInteger,
				to  : to as ValidInteger
			}
		}
	}

}
