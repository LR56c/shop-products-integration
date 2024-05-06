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
import { OrderDto } from '../dto/order_dto'
import { parseCreateOrder } from '../utils/parse-create.order'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { UpdateOrderService } from './update-order.service'

@ApiTags( 'orders' )
@Controller( 'orders' )
export class UpdateOrderController {
	constructor( private readonly updateOrderService: UpdateOrderService,
		private readonly translation: TranslationService )
	{}

	@Put()
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				id           : {
					type   : 'string',
					example: 'd78c0982-8ddd-46ef-b2d4-41787f150a98'
				},
				seller_email : {
					type   : 'string',
					example: 'aaaa@gmail.com'
				},
				client_email : {
					type   : 'string',
					example: 'ac@gmail.com'
				},
				creation_date: {
					type   : 'string',
					example: '2024-04-27'
				},
				approved     : {
					type   : 'boolean',
					example: 'true'
				},
				payment_id   : {
					type   : 'string',
					example: 'd78c0982-8ddd-46ef-b2d4-41887f150a98'
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Update a product',
		description: 'Update a product by product_code and json data'
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
	async updateOrder(
		@Body() dto: OrderDto
	)
	{
		try {

			const { data } = parseCreateOrder( dto )

			await this.updateOrderService.updateOrder(
				data.id,
				data.seller_email,
				data.client_email,
				data.creation_date,
				data.approved,
				data.payment_id
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
