import { ExportReportFormat } from '../../domain/models/export_report_format'
import { ReportPayment } from '../../features/payments/domain/report_payment'
import { Errors } from '../../../shared/domain/exceptions/errors'

export const ReportSaleMethod = async ( title: string,
	reports: ReportPayment[] ): Promise<ExportReportFormat | Errors> => {
	const dateFirstReport = reports[0].date.value

	const extractedMonth = dateFirstReport.getMonth() + 1
	const extractedYear  = dateFirstReport.getFullYear()

	const sumByDay: { [keday_: number]: number } = {}

	//TODO: probar logs para corroborar que solo tome el mes
	reports.forEach( ( { value, date } ) => {
		const day     = date.value.getDate()
		sumByDay[day] = sumByDay[day] || 0
		sumByDay[day] += value.value
	} )

	console.log( 'sumByDay', sumByDay )
	const labels = Object.keys( sumByDay )
	                     .map(
		                     day => `${ day }/${ extractedMonth }/${ extractedYear }` )
	console.log( 'labels', labels )

	return new ExportReportFormat(
		Object.values( sumByDay ),
		labels,
		title,
		dateFirstReport
	)
}
