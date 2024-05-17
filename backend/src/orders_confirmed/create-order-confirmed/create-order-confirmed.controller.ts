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
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { wrapType } from '~features/shared/utils/WrapType'
import { OrderConfirmedDto } from '../shared/order_confirmed_dto'
import { parseOrderConfirmed } from '../shared/parse_order_confirmed'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResult } from '../../shared/utils/HttpResult'
import { OrderConfirmed } from '~features/order_confirmed/domain/order_confirmed'
import { CreateOrderConfirmedService } from './create-order-confirmed.service'

@ApiTags( 'orders-confirmed' )
@Controller( 'orders-confirmed' )
export class CreateOrderConfirmedController {
	constructor( private readonly createOrderConfirmedService: CreateOrderConfirmedService,
		private readonly translation: TranslationService )
	{}

	@Post()
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				id              : {
					type   : 'string',
					example: '3643fe52-f496-4d1f-87b9-d81d71ddf61d'
				},
				order_id        : {
					type   : 'string',
					example: '2e012d65-178a-41dc-b902-46335ee9f3f1'
				},
				creation_date   : {
					type   : 'string',
					example: '2024-04-27'
				},
				accountant_email: {
					type   : 'string',
					example: 'ac@gmail.com'
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Create a order confirmed',
		description: 'Create a order confirmed json data'
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
		@Body() dto: OrderConfirmedDto
	): Promise<HttpResult> {
		try {

			const errors: BaseException[] = []

			const idResult = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( dto.order_id ) )

			if ( idResult instanceof BaseException ) {
				errors.push( new InvalidUUIDException( 'id' ) )
			}

			const orderConfirmed = parseOrderConfirmed( dto )

			if ( !( orderConfirmed instanceof OrderConfirmed ) ) {
				errors.push( ...orderConfirmed )
			}

			if ( errors.length > 0 ) {
				throw errors
			}

			await this.createOrderConfirmedService.execute( idResult as UUID,
				orderConfirmed as OrderConfirmed )

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
