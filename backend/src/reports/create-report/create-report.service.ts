import { Injectable } from '@nestjs/common'
import { ChartConfiguration } from 'chart.js'
import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
import { PDFDocument } from 'pdf-lib'
import {
	ReportType,
	ReportTypeEnum
} from '~features/report/domain/models/report_type'
import { ReportRepository } from '~features/report/domain/repository/report_repository'
import { ReportPayment } from '~features/report/features/payments/domain/report_payment'
import { ReportPaymentRepository } from '~features/report/features/payments/domain/report_payment_repository'
import { NotImplementedException } from '~features/shared/domain/exceptions/NotImplementedException'
import { SubTypeNotExistException } from '~features/shared/domain/exceptions/SubTypeNotExistException'
import { ValidDate } from '~features/shared/domain/value_objects/ValidDate'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { ValidURL } from '~features/shared/domain/value_objects/ValidURL'

@Injectable()
export class CreateReportService {
	constructor(
		private readonly repo: ReportRepository,
		private readonly reportPaymentRepository: ReportPaymentRepository
	)
	{}

	async createReport( type: ReportType ): Promise<ValidURL> {
		let data: Uint8Array = new Uint8Array()
		let name: string     = ''
		if ( type.value === ReportTypeEnum.sale ) {
			const from     = ValidDate.from( '2024-05-01' )
			const to       = ValidDate.from( '2024-05-31' )
			const payments = await this.reportPaymentRepository.get(
				ValidInteger.from( 0 ), ValidInteger.from( 10000 ),
				from, to )
			name           = 'Sales May'
			data           = await generateGraph( name, payments )
			// const image    = await generateGraph( name, payments )
			// data           = await generatePDFData( image )
		}
		else if ( type.value === ReportTypeEnum.performance ) {
			throw [ new NotImplementedException() ]
		}
		else {
			throw [ new SubTypeNotExistException( 'report' ) ]
		}

		return this.repo.createReport( type, ValidString.from(
			`${ new Date().toUTCString() }-${ name.toLowerCase() }.png` ), data )
	}
}

async function generateGraph( title: string, payments: ReportPayment[] ) {

	const extractedMonth = payments[0].date.value.getMonth() + 1
	const extractedYear  = payments[0].date.value.getFullYear()

	const sumByDay: { [keday_: number]: number } = {}

	payments.forEach( ( { value, date } ) => {
		const day     = date.value.getDate()
		sumByDay[day] = sumByDay[day] || 0
		sumByDay[day] += value.value
	} )

	const labels = Object.keys( sumByDay )
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
					label      : title,
					data       : Object.values( sumByDay ),
					fill       : false,
					borderColor: 'rgb(75, 192, 192)',
					tension    : 0.1
				}
			]
		}
	}
	return await chartJSNodeCanvas.renderToBuffer( configuration, 'image/png' )
}

async function generatePDFData( image: Buffer )
{
	const doc      = await PDFDocument.create()
	const imageDoc = await doc.embedPng( image )
	const page     = doc.addPage()
	page.drawImage( imageDoc )
	return await doc.save()
}
