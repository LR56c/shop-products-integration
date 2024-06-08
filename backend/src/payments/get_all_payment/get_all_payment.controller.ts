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
import { paymentToJson } from '~features/payments/application/payment_mapper'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetAllPaymentService } from './get_all_payment.service'

@ApiTags( 'payments' )
@Controller( 'payments' )
export class GetAllPaymentController {
	constructor( private readonly getAllPaymentService: GetAllPaymentService,
		private readonly translation: TranslationService )
	{}

	@Get()
	@ApiQuery( {
		name    : 'approved',
		type    : Boolean,
		required: false
	} )
	@ApiQuery( {
		name    : 'from_date',
		type    : Date,
		required: false
	} )
	@ApiQuery( {
		name    : 'to_date',
		type    : Date,
		required: false
	} )
	@ApiOperation( {
		summary    : 'Get all payments',
		description: 'Get all payments from a range of payments, and optionally filter by approved'
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
									id           : {
										type   : 'string',
										example: 'UUID'
									},
									creationDate : {
										type   : 'string',
										example: 'date'
									},
									approved     : {
										type   : 'string',
										example: 'boolean'
									},
									deliveryName : {
										type   : 'string',
										example: 'string'
									},
									paymentValue : {
										type   : 'string',
										example: 'number'
									},
									paymentMethod: {
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
		@Query( 'approved' ) approved?: boolean,
		@Query( 'from_date' ) from_date?: string,
		@Query( 'to_date' ) to_date?: string
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {

			const payments = await this.getAllPaymentService.getAll(
				from,
				to,
				approved,
				from_date,
				to_date
			)

			let json: Record<string, any>[] = []
			for ( const payment of payments ) {
				json.push( paymentToJson( payment ) )
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


