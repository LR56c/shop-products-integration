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
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import { ReportTypeException } from 'packages/report/domain/exception/ReportTypeException'
import { ReportType } from 'packages/report/domain/models/report_type'
import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { wrapType } from 'packages/shared/utils/wrap_type'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { CreateReportService } from './create-report.service'

@ApiTags( 'reports' )
@Controller( 'reports' )
export class CreateReportController {
	constructor( private readonly createReportService: CreateReportService,
		private readonly translation: TranslationService
	)
	{}

	@Post()
	@ApiBody( {
		schema: {
			type      : 'object',
			properties: {
				type: {
					type   : 'string',
					example: 'SALE'
				}
			}
		}
	} )
	@ApiOperation( {
		summary    : 'Create a report',
		description: 'Create a report json data. SALE (MONTHLY) / PERFORMANCE (ANNUAL)'
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
							type   : 'string',
							example: 'image url'
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
	async createReport(
		@Body( 'type' ) type: string
	): Promise<HttpResultData<string>> {
		try {
			const typeResult = wrapType<ReportType, ReportTypeException>(
				() => ReportType.from( type ) )
			if ( typeResult instanceof BaseException ) {
				throw typeResult
			}

			const result = await this.createReportService.createReport(
				typeResult as ReportType )

			return {
				statusCode: HttpStatus.OK,
				data      : result.value
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
