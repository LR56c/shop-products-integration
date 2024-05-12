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
import { ChartConfiguration } from 'chart.js'
import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
import { HttpResultData } from 'src/shared/utils/HttpResultData'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { ReportTypeException } from '~features/report/domain/exception/ReportTypeException'
import { ReportType } from '~features/report/domain/models/report_type'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { wrapType } from '~features/shared/utils/WrapType'
import { CreateReportService } from './create-report.service'
import { PDFDocument } from 'pdf-lib'

@ApiTags( 'reports' )
@Controller( 'reports' )
export class CreateReportController {
	constructor( private readonly createReportService: CreateReportService,
		private readonly translation: TranslationService
	)
	{
	}

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
		// @Body('report') dto: CreateReportDto
		@Body( 'type' ) type: string
	): Promise<HttpResultData<string>> {
		try {

			// const { errors, data } = parseReport( dto )
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


async function a()
{
	const myJson                                = [
		{ value: 700, date: new Date( '05-05-2022' ) },
		{ value: 800, date: new Date( '05-05-2022' ) },
		{ value: 600, date: new Date( '05-05-2022' ) },
		{ value: 900, date: new Date( '05-20-2022' ) },
		{ value: 750, date: new Date( '05-20-2022' ) },
		{ value: 850, date: new Date( '05-20-2022' ) },
		{ value: 950, date: new Date( '05-25-2022' ) },
		{ value: 700, date: new Date( '05-25-2022' ) }
	]
	const sumJson: { [keday_: number]: number } = {}

	const extractedMonth = myJson[0].date.getMonth() + 1
	const extractedYear  = myJson[0].date.getFullYear()

	myJson.forEach( ( { value, date } ) => {
		const day    = date.getDate()
		sumJson[day] = sumJson[day] || 0
		sumJson[day] += value
	} )

	const labels = Object.keys( sumJson )
	                     .map(
		                     day => `${ day }/${ extractedMonth }/${ extractedYear }` )

	const width             = 800 //px
	const height            = 800 //px
	const backgroundColour  = 'white' // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
	const chartJSNodeCanvas = new ChartJSNodeCanvas(
		{ width, height, backgroundColour } )

	const configuration: ChartConfiguration = {
		type: 'line',
		data: {
			labels  : labels,
			datasets: [
				{
					label      : 'My First Dataset',
					data       : Object.values( sumJson ),
					fill       : false,
					borderColor: 'rgb(75, 192, 192)',
					tension    : 0.1
				}
			]
		}
	}
	const image                             = await chartJSNodeCanvas.renderToBuffer(
		configuration )
	const doc                               = await PDFDocument.create()
	const imageDoc                          = await doc.embedPng( image )
	const page                              = doc.addPage()
	page.drawImage( imageDoc )
	const pdf = await doc.save()


	const r = await this.client.storage.from( 'reports' )
	                    .upload( 'report.pdf', pdf )
	console.log( 'r' )
	console.log( r )
	return 'ok'
}
