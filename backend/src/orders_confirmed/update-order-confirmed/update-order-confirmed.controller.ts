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
import { parseOrder } from 'src/orders/utils/parse.order'
import { OrderConfirmedDto } from 'src/orders_confirmed/shared/order_confirmed_dto'
import { parseOrderConfirmed } from 'src/orders_confirmed/shared/parse_order_confirmed'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResult } from 'src/shared/utils/HttpResult'
import { OrderConfirmed } from '~features/order_confirmed/domain/order_confirmed'
import { PartialOrder } from '~features/orders/domain/order'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { wrapType } from '~features/shared/utils/WrapType'
import { UpdateOrderConfirmedService } from './update-order-confirmed.service'

@ApiTags( 'orders-confirmed' )
@Controller( 'orders-confirmed' )
export class UpdateOrderConfirmedController {
	constructor( private readonly updateOrderConfirmedService: UpdateOrderConfirmedService,
		private readonly translation: TranslationService )
	{}

	@Put()
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				id           : {
					type   : 'string',
					example: 'd78c0982-8ddd-46ef-b2d4-41887f150a98'
				},
				creation_date: {
					type   : 'string',
					example: '2024-04-27'
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Update a order confirmed',
		description: 'Update a order confirmed by json data'
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
	async updateOrderConfirmed(
		@Body() dto: OrderConfirmedDto
	): Promise<HttpResult> {
		try {
			const order = parseOrderConfirmed( dto )

			if ( !( order instanceof OrderConfirmed ) ) {
				throw [ order ]
			}

			const o = order as OrderConfirmed
			await this.updateOrderConfirmedService.execute( o.id, o )

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
