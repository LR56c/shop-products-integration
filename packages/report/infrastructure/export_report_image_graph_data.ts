import { ChartConfiguration } from 'chart.js'
import { ChartJSNodeCanvas } from 'chartjs-node-canvas'
import { ExportReportRepository } from '../domain/repository/export_report_repository'
import { ExportReportFormat } from '../domain/models/export_report_format'

export class ExportReportImageGraphData implements ExportReportRepository {
    async format(data: ExportReportFormat): Promise<Buffer> {
	    const width             = 800 //px
	    const height            = 800 //px
	    const backgroundColour  = 'white' // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
	    const chartJSNodeCanvas = new ChartJSNodeCanvas(
		    { width, height, backgroundColour } )

	    const configuration: ChartConfiguration = {
		    type: 'line',
		    data: {
			    labels  : data.labels,
			    datasets: [
				    {
					    label      : data.title,
					    data       : data.values,
					    fill       : false,
					    borderColor: 'rgb(75, 192, 192)',
					    tension    : 0.1
				    }
			    ]
		    }
	    }
	    return await chartJSNodeCanvas.renderToBuffer( configuration, 'image/png' )
    }
}
