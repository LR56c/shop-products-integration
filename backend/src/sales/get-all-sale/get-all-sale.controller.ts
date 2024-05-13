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
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import { saleToJson } from '~features/discount_type/features/sales/application/sale_mapper'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidDateException } from '~features/shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { ValidDate } from '~features/shared/domain/value_objects/ValidDate'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { GetAllSaleService } from './get-all-sale.service'

@ApiTags( 'sales' )
@Controller( 'sales' )
export class GetAllSaleController {
	constructor( private readonly getAllSaleService: GetAllSaleService,
		private readonly translation: TranslationService
	)
	{}

	@Get()
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
		summary    : 'Get all sales',
		description: 'Get all sales from a range of dates'
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
								properties: {
									id        : {
										type   : 'string',
										example: 'uuid'
									},
									product_id      : {
										type   : 'string',
										example: 'uuid'
									},
									percentage: {
										type   : 'string',
										example: 'decimal'
									},
									create_at : {
										type   : 'string',
										example: 'date'
									},
									end_date  : {
										type   : 'string',
										example: 'date'
									},
									start_date: {
										type   : 'string',
										example: 'date'
									},
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
		@Query( 'from_date' ) from_date?: string,
		@Query( 'to_date' ) to_date?: string
	): Promise<HttpResultData<Record<string, any>[]>> {
		try {
			const { data, errors } = this.parseGetAllSales( {
				from,
				to,
				from_date,
				to_date
			} )
			if ( errors.length > 0 ) {
				return {
					statusCode: HttpStatus.BAD_REQUEST,
					message   : this.translation.translateAll( errors )
				}
			}
			const sales                     = await this.getAllSaleService.getAll(
				data.from,
				data.to,
				data.from_date,
				data.to_date
			)
			let json: Record<string, any>[] = []
			for ( const p of sales ) {
				json.push( saleToJson( p ) )
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

	parseGetAllSales( dto: {
		from: number,
		to: number,
		from_date?: string,
		to_date?: string,
	} ): {
		errors: BaseException[],
		data: {
			from: ValidInteger
			to: ValidInteger
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
				from_date: from_date as ValidDate,
				to_date  : to_date as ValidDate
			},
			errors
		}
	}
}
