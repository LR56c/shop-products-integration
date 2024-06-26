import {
	Controller,
	Get,
	HttpStatus,
	Query
} from '@nestjs/common'
import {
	ApiOperation,
	ApiQuery,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { orderResponseToJson } from '../../../packages/orders/application/order_mapper'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetAllOrdersService } from './get-all-orders.service'

@ApiTags( 'orders' )
@Controller( 'orders' )
export class GetAllOrdersController {
	constructor( private readonly getAllOrdersService: GetAllOrdersService,
		private readonly translation: TranslationService )
	{}

	@Get()
	@ApiQuery( {
		name    : 'client_email',
		type    : String,
		required: false
	} )
	@ApiOperation( {
		summary    : 'Get all orders',
		description: 'Get all orders from a range of orders, and optionally filter by client email'
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
							type : 'array',
							items: {
								type      : 'object',
								properties: {
									id             : {
										type   : 'string',
										example: 'uuid'
									},
									seller_email   : {
										type   : 'string',
										example: 'string'
									},
									client_email   : {
										type   : 'string',
										example: 'string'
									},
									order_confirmed: {
										type   : 'string',
										example: 'uuid'
									},
									item_confirmed : {
										type   : 'string',
										example: 'uuid'
									},
									created_at     : {
										type   : 'string',
										example: 'date'
									},
									payment        : {
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
									products       : {
										type : 'array',
										items: {
											type      : 'object',
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
	async getAll(
		@Query( 'from' ) from: number,
		@Query( 'to' ) to: number,
		@Query( 'client_email' ) client_email?: string
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {

			const orders = await this.getAllOrdersService.getAllOrders( from,
				to, client_email )

			let json: Record<string, any>[] = []
			for ( const order of orders ) {
				json.push( orderResponseToJson( order ) )
			}

			return {
				data      : json,
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
