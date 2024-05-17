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
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidBooleanException } from '~features/shared/domain/exceptions/InvalidBooleanException'
import { InvalidDateException } from '~features/shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { ValidBool } from '~features/shared/domain/value_objects/ValidBool'
import { ValidDate } from '~features/shared/domain/value_objects/ValidDate'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { wrapType } from '~features/shared/utils/WrapType'
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
			const { data, errors } = this.parseGetAllPayment( {
				from,
				to,
				approved,
				from_date,
				to_date
			} )
			if ( errors.length > 0 ) {
				return {
					statusCode: HttpStatus.BAD_REQUEST,
					message   : this.translation.translateAll( errors )
				}
			}
			const payments                  = await this.getAllPaymentService.getAll(
				data.from,
				data.to,
				data.approved,
				data.from_date,
				data.to_date
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

	parseGetAllPayment( dto: {
		from: number,
		to: number,
		approved?: boolean,
		from_date?: string,
		to_date?: string,
	} ): {
		errors: BaseException[],
		data: {
			from: ValidInteger
			to: ValidInteger
			approved?: ValidBool
			from_date?: ValidDate
			to_date?: ValidDate
		}
	}
	{
		const errors: BaseException[] = []

		const from = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.from )
		)
		if ( from instanceof BaseException ) {
			errors.push( new InvalidIntegerException( 'from' ) )
		}
		const to = wrapType<ValidInteger, InvalidIntegerException>(
			() => ValidInteger.from( dto.to )
		)
		if ( to instanceof BaseException ) {
			errors.push( new InvalidIntegerException( 'to' ) )
		}
		const approved = dto.approved === undefined ?
			undefined : wrapType<ValidBool, InvalidBooleanException>(
				() => ValidBool.from( dto.approved ?? false ) )

		const from_date = dto.from_date === undefined ?
			undefined : wrapType<ValidDate, InvalidDateException>(
				() => ValidDate.from( dto.from_date ?? '' ) )

		const to_date = dto.to_date === undefined ?
			undefined : wrapType<ValidDate, InvalidDateException>(
				() => ValidDate.from( dto.to_date ?? '' ) )

		return {
			data: {
				from     : from as ValidInteger,
				to       : to as ValidInteger,
				approved : approved as ValidBool,
				from_date: from_date as ValidDate,
				to_date  : to_date as ValidDate
			},
			errors
		}
	}
}


