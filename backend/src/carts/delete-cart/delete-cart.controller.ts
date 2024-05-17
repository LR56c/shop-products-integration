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
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from '../../shared/utils/HttpResult'
import { DeleteCartService } from './delete-cart.service'

@ApiTags( 'carts' )
@Controller( 'carts' )
export class DeleteCartController {
	constructor( private readonly deleteCartService: DeleteCartService,
		private readonly translation: TranslationService )
	{}

	@Delete()
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				user_email: {
					type   : 'string',
					example: 'aaaa@gmail.com'
				},
				product_id: {
					type   : 'string',
					example: '359b6378-f875-4d31-b415-d3de60a59875'
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Delete cart',
		description: 'Delete cart by user_email and product_id'
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
	async deleteCart(
		@Body( 'user_email' ) user_email: string,
		@Body( 'product_id' ) product_id: string
	): Promise<HttpResult> {
		try {

			await this.deleteCartService.deleteCart( user_email, product_id )

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
