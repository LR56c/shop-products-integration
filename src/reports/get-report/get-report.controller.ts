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
import { reportToJson } from '../../../packages/report/application/report_mapper'
import { ReportTypeException } from '../../../packages/report/domain/exception/ReportTypeException'
import { ReportType } from '../../../packages/report/domain/models/report_type'
import { BaseException } from '../../../packages/shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../../packages/shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../../packages/shared/domain/exceptions/InvalidIntegerException'
import { ValidDate } from '../../../packages/shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../packages/shared/domain/value_objects/valid_integer'
import { wrapType } from '../../../packages/shared/utils/wrap_type'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { HttpResultData } from '../../shared/utils/HttpResultData'
import { GetReportService } from './get-report.service'

@ApiTags( 'reports' )
@Controller( 'reports' )
export class GetReportController {
	constructor( private readonly getReportService: GetReportService,
		private readonly translation: TranslationService )
	{}

	@Get()
	@ApiQuery( {
		name    : 'type',
		type    : String,
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
		summary    : 'Get report',
		description: 'Get report from a range'
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
									id        : {
										type   : 'string',
										example: 'uuid'
									},
									name      : {
										type   : 'string',
										example: 'string'
									},
									url       : {
										type   : 'string',
										example: 'string'
									},
									type      : {
										type   : 'string',
										example: 'string'
									},
									created_at: {
										type   : 'string',
										example: 'date'
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
	async getReport(
		@Query( 'from' ) from: number,
		@Query( 'to' ) to: number,
		@Query( 'type' ) type?: string,
		@Query( 'from_date' ) from_date?: string,
		@Query( 'to_date' ) to_date?: string
	): Promise<HttpResultData<Record<string, any>>> {
		try {

			const reportResult = this.parseGetAllReport( {
				from,
				to,
				type,
				from_date,
				to_date
			} )

			const report = await this.getReportService.getReport(
				reportResult.data.from,
				reportResult.data.to,
				reportResult.data.type,
				reportResult.data.from_date,
				reportResult.data.to_date
			)

			return {
				data      : report.map( reportToJson ),
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

	parseGetAllReport( dto: {
		from: number,
		to: number,
		type?: string,
		from_date?: string,
		to_date?: string,
	} ): {
		data: {
			from: ValidInteger
			to: ValidInteger
			type: ReportType
			from_date: ValidDate
			to_date: ValidDate
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

		const type = dto.type === undefined
			? undefined
			: wrapType<ReportType, ReportTypeException>(
				() => ReportType.from( dto.type ?? '' ) )

		if ( type != undefined && type instanceof BaseException ) {
			errors.push( new ReportTypeException() )
		}

		const from_date = dto.from_date === undefined
			? undefined
			: wrapType<ValidDate, InvalidDateException>(
				() => ValidDate.from( dto.from_date ?? '' ) )

		if ( from_date != undefined && from_date instanceof BaseException ) {
			errors.push( new InvalidDateException() )
		}

		const to_date = dto.to_date === undefined
			? undefined
			: wrapType<ValidDate, InvalidDateException>(
				() => ValidDate.from( dto.to_date ?? '' ) )

		if ( to_date != undefined && to_date instanceof BaseException ) {
			errors.push( new InvalidDateException() )
		}

		if ( errors.length > 0 ) {
			throw errors
		}

		return {
			data: {
				from     : from as ValidInteger,
				to       : to as ValidInteger,
				type     : type as ReportType,
				to_date  : to_date as ValidDate,
				from_date: from_date as ValidDate
			}
		}
	}
}
