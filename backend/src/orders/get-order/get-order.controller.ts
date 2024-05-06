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
import { orderToJson } from '~features/orders/application/order_mapper'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { wrapType } from '~features/shared/utils/WrapType'
import { GetOrderService } from './get-order.service'

@ApiTags( 'orders' )
@Controller( 'orders' )
export class GetOrderController {
	constructor( private readonly getOrderService: GetOrderService,
		private readonly translation: TranslationService )
	{}

	@Get( ':id' )

	@ApiOperation( {
		summary    : 'Get order',
		description: 'Get order by id'
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
						},
						data      : {
							type      : 'object',
							properties: {
								id          : {
									type   : 'string',
									example: 'uuid'
								},
								seller_email: {
									type   : 'string',
									example: 'string'
								},
								client_email: {
									type   : 'string',
									example: 'string'
								},
								created_at  : {
									type   : 'string',
									example: 'date'
								},
								approved    : {
									type   : 'string',
									example: 'boolean'
								},
								payment     : {
									type      : 'object',
									properties: {
										id              : {
											type   : 'string',
											example: 'uuid'
										},
										created_at      : {
											type   : 'string',
											example: 'date'
										},
										approved        : {
											type   : 'string',
											example: 'boolean'
										},
										delivery_address: {
											type   : 'string',
											example: 'string'
										},
										value           : {
											type   : 'string',
											example: 'integer'
										},
										payment_method  : {
											type   : 'string',
											example: 'string'
										}
									}
								},
								products    : {
									properties: {
										id          : {
											type   : 'string',
											example: 'uuid'
										},
										code        : {
											type   : 'string',
											example: 'string'
										},
										product_code: {
											type   : 'string',
											example: 'string'
										},
										name        : {
											type   : 'string',
											example: 'string'
										},
										description : {
											type   : 'string',
											example: 'string'
										},
										created_at  : {
											type   : 'string',
											example: 'date'
										},
										brand       : {
											type   : 'string',
											example: 'string'
										},
										price       : {
											type   : 'string',
											example: 'number'
										},
										image_url   : {
											type   : 'string',
											example: 'url'
										},
										stock       : {
											type   : 'string',
											example: 'number'
										},
										average_rank: {
											type   : 'string',
											example: 'decimal'
										},
										category    : {
											type   : 'string',
											example: 'string'
										}
									}
								}
							}
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
	async getOrder(
		@Param( 'id' ) id: string
	): Promise<HttpResultData<Record<string, any>>> {
		try {

			const idResult = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( id ) )

			if ( idResult instanceof BaseException ) {
				throw [ new InvalidUUIDException( 'order_id' ) ]
			}

			const result = await this.getOrderService.getOrder( idResult )

			return {
				statusCode: HttpStatus.OK,
				data      : orderToJson( result )
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
