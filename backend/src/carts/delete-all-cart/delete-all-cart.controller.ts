import {
	Body,
	Controller,
	Delete,
	HttpStatus
} from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { wrapType } from '~features/shared/utils/WrapType'
import { DeleteAllCartService } from './delete-all-cart.service'

@ApiTags( 'carts' )
@Controller( 'carts' )
export class DeleteAllCartController {
	constructor( private readonly deleteAllCartService: DeleteAllCartService,
		private readonly translation: TranslationService )
	{}

	@Delete('all')
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				user_email: {
					type   : 'string',
					example: 'aaaa@gmail.com'
				},
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Delete all cart',
		description: 'Delete all cart by user_email'
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
	async deleteAllCart( @Body(
		'user_email' ) user_email: string ): Promise<HttpResult> {
		try {

			await this.deleteAllCartService.deleteAllCart( user_email )

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
