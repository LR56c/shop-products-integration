import {
	Controller,
	Get,
	HttpStatus,
	Param
} from '@nestjs/common'
import {
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { CheckNewsLetterService } from './check-news-letter.service'

@ApiTags( 'news-letters' )
@Controller( 'news-letters' )
export class CheckNewsLetterController {
	constructor( private readonly checkNewsLetterService: CheckNewsLetterService,
		private readonly translation: TranslationService )
	{}

	@Get( ':email' )
	@ApiOperation( {
		summary    : 'Check news letter',
		description: 'Check news letter by email'
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
	async checkNewsLetter( @Param(
		'email' ) email: string ): Promise<HttpResultData<boolean>> {
		try {

			const newsLetter = await this.checkNewsLetterService.checkNewsLetter(
				email )
			return {
				data      : newsLetter,
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
}
