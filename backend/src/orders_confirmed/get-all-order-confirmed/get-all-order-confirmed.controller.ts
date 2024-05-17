import {
	Controller,
	Get,
	HttpStatus,
	Query
} from '@nestjs/common'
import {
	ApiOperation,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger'
import { orderConfirmedToJson } from '~features/order_confirmed/application/order_confirmed_mapper'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { wrapType } from '~features/shared/utils/WrapType'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetAllOrderConfirmedService } from './get-all-order-confirmed.service'

@ApiTags( 'orders-confirmed' )
@Controller( 'orders-confirmed' )
export class GetAllOrderConfirmedController {
	constructor( private readonly getAllOrderConfirmedService: GetAllOrderConfirmedService,
		private readonly translation: TranslationService )
	{}

	@Get()
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
									id              : {
										type   : 'string',
										example: 'uuid'
									},
									creation_date   : {
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
	async getAllOrderConfirmed(
		@Query( 'from' ) from: number,
		@Query( 'to' ) to: number
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {

			const { data } = this.parseGetAllOrdersConfirmed( { from, to } )

			const ordersConfirmed = await this.getAllOrderConfirmedService.execute(
				data.from,
				data.to )

			let json: Record<string, any>[] = []
			for ( const o of ordersConfirmed ) {
				json.push( orderConfirmedToJson( o ) )
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

	parseGetAllOrdersConfirmed( dto: {
		from: number,
		to: number,
	} ): {
		data: {
			from: ValidInteger
			to: ValidInteger
		}
	}
	{
		const errors: BaseException[] = []

		const from = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.from ) )

		if ( from instanceof InvalidIntegerException ) {
			errors.push( new InvalidIntegerException( 'from' ) )
		}

		const to = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.to ) )

		if ( to instanceof InvalidIntegerException ) {
			errors.push( new InvalidIntegerException( 'to' ) )
		}

		if ( errors.length > 0 ) {
			throw errors
		}

		return {
			data: {
				from: from as ValidInteger,
				to  : to as ValidInteger
			}
		}
	}

}
