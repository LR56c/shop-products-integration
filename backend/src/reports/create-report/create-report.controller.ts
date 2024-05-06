import {
	Controller,
	Get
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { SupabaseClient } from '@supabase/supabase-js'
import { ChartConfiguration } from 'chart.js'
import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
import { Database } from 'database.types'
import { PDFDocument } from 'pdf-lib'
import { TranslationService } from 'src/shared/services/translation/translation.service'
import { CreateReportService } from './create-report.service'

@ApiTags( 'reports' )
@Controller( 'reports' )
export class CreateReportController {
	constructor( private readonly createReportService: CreateReportService,
		private readonly translation: TranslationService,
		private readonly client: SupabaseClient<Database>
	)
	{}

	// @Post()
	@Get( 'export' )
	// async createReport() : Promise<HttpResult> {
	async createReport() {

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
		const page = doc.addPage()
		page.drawImage(imageDoc)
		const pdf                               = await doc.save()


		const r = await this.client.storage.from( 'reports' )
		                    .upload( 'report.pdf', pdf )
		console.log( 'r' )
		console.log( r )
		return 'ok'
	}
}
