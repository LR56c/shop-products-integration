import {
	Body,
	Controller,
	HttpStatus,
	Post
} from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { PartialOrderDto } from 'src/orders/dto/partial_order_dto'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from '../../shared/utils/HttpResult'
import { CreateOrderService } from './create-order.service'
import { parsePartialOrder } from 'src/orders/utils/parsePartialOrder'

@ApiTags( 'orders' )
@Controller( 'orders' )
export class CreateOrderController {
	constructor( private readonly createOrderService: CreateOrderService,
		private readonly translation: TranslationService )
	{}

	@Post()
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				client_email: {
					type   : 'string',
					example: 'ac@gmail.com'
				},
				payment_id  : {
					type   : 'string',
					example: 'd78c0982-8ddd-46ef-b2d4-41887f150a98'
				},
				products    : {
					type : 'array',
					items: {
						type: 'object',
						properties: {
							quantity  : {
								type   : 'number',
								example: 1
							},
							product_id: {
								type   : 'string',
								example: '359b6378-f875-4d31-b415-d3de60a59875'
							},
						}
					}
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Create a order',
		description: 'Create a order json data'
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
	async createOrder(
		@Body() dto: PartialOrderDto
	): Promise<HttpResult> {
		try {
			const order = parsePartialOrder( dto )

			await this.createOrderService.createOrder( order )

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

