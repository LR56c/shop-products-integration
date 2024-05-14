import {
	Body,
	Controller,
	HttpStatus,
	Param,
	Put
} from '@nestjs/common'
import {
	ApiBody,
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { PartialOrderDto } from 'src/orders/dto/partial_order_dto'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { PartialOrder } from '~features/orders/domain/order'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { wrapType } from '~features/shared/utils/WrapType'
import { parsePartialOrder } from 'src/orders/utils/parsePartialOrder'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { UpdateOrderService } from './update-order.service'

@ApiTags( 'orders' )
@Controller( 'orders' )
export class UpdateOrderController {
	constructor( private readonly updateOrderService: UpdateOrderService,
		private readonly translation: TranslationService )
	{}

	@Put( ':id' )
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				client_email : {
					type   : 'string',
					example: 'ac@gmail.com'
				},
				payment_id   : {
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
		@Param( 'id' ) id: string,
		@Body() dto: PartialOrderDto
	) : Promise<HttpResult>
	{
		try {

			const errors: BaseException[] = []

			const order = parsePartialOrder( dto )

			const idResult = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( id ) )

			if ( idResult instanceof BaseException ) {
				errors.push( new InvalidUUIDException() )
			}

			if ( errors.length > 0 ) {
				return {
					statusCode: HttpStatus.BAD_REQUEST,
					message   : this.translation.translateAll( errors )
				}
			}

			await this.updateOrderService.updateOrder( idResult as UUID,
				order as PartialOrder )

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
