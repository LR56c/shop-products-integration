import {
	Body,
	Controller,
	HttpStatus,
	Put
} from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { CartDto } from 'src/carts/dto/cart_dto'
import { parseAddCart } from 'src/carts/utils/parse-add.cart'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { cartFromJson } from '~features/carts/application/cart_mapper'
import { Cart } from '~features/carts/domain/cart'
import { Email } from '~features/shared/domain/value_objects/Email'
import { UpdateCartService } from './update-cart.service'

@ApiTags( 'carts' )
@Controller( 'carts' )
export class UpdateCartController {
	constructor( private readonly updateCartService: UpdateCartService,
		private readonly translation: TranslationService )
	{}

	@Put()
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
				},
				quantity  : {
					type   : 'number',
					example: 1
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Update cart',
		description: 'Update cart by cart json data'
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
	async updateCart( @Body() dto: CartDto ): Promise<HttpResult> {
		try {

			const { data } = parseAddCart( dto )


			await this.updateCartService.updateCart(
				data.user_email,
				data.product_id,
				data.quantity
			)

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
