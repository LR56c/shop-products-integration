import {
	Controller,
	Delete,
	HttpStatus,
	Param
} from '@nestjs/common'
import {
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { RemoveNewsLetterService } from './remove-news-letter.service'

@ApiTags( 'news-letters' )
@Controller( 'news-letters' )
export class RemoveNewsLetterController {
	constructor( private readonly removeNewsLetterService: RemoveNewsLetterService,
		private readonly translation: TranslationService
	)
	{}

	@Delete( ':email' )
	@ApiOperation( {
		summary: 'Delete news letter',
		description: 'Delete news letter by user email'
	} )
	@ApiResponse( {
		status     : 200,
		content: {
			'application/json': {
				schema: {
					type: 'object',
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
		status     : 400,
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 400
						},
						message: {
							type      : 'object',
							properties: {
								code_error   : {
									type   : 'string',
									example: 'error translation'
								},
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
		content: {
			'application/json': {
				schema: {
					type: 'object',
					properties: {
						statusCode: {
							type   : 'number',
							example: 500
						},
					}
				}
			}
		}
	} )
	async removeNewsLetter( @Param(
		'email' ) email: string ): Promise<HttpResult> {
		try {

			const emailResult = wrapType<Email, EmailException>(
				() => Email.from( email ) )

			if ( emailResult instanceof BaseException ) {
				throw [ new EmailException( 'email' ) ]
			}

			await this.removeNewsLetterService.remove( emailResult as Email )

			return {
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
