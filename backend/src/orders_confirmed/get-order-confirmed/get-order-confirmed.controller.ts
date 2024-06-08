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
import { orderConfirmedToJson } from '~features/order_confirmed/application/order_confirmed_mapper'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/uuid'
import { wrapType } from '~features/shared/utils/wrap_type'
import { GetOrderConfirmedService } from './get-order-confirmed.service'

@ApiTags( 'orders-confirmed' )
@Controller( 'orders-confirmed' )
export class GetOrderConfirmedController {
	constructor( private readonly getOrderConfirmedService: GetOrderConfirmedService,
		private readonly translation: TranslationService )
	{}

	@Get( ':id' )
	@ApiOperation( {
		summary    : 'Get order confirmed',
		description: 'Get order confirmed by id'
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
								id              : {
									type   : 'string',
									example: 'uuid'
								},
								created_at      : {
									type   : 'string',
									example: 'date'
								},
								accountant_email: {
									type   : 'string',
									example: 'email'
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

			const result = await this.getOrderConfirmedService.execute( id )

			return {
				statusCode: HttpStatus.OK,
				data      : orderConfirmedToJson( result )
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
