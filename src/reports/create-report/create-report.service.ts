import { Injectable } from '@nestjs/common'
import { CreateReport } from '../../../packages/report/application/create_report'
import { ExportReport } from '../../../packages/report/application/export_report'
import { ReportSaleMethod } from '../../../packages/report/application/report_methods/report_sale_method'
import {
	ReportType,
	ReportTypeEnum
} from '../../../packages/report/domain/models/report_type'
import { ReportDAO } from '../../../packages/report/domain/repository/report_dao'
import { GetAllReportPayment } from '../../../packages/report/features/payments/application/get_all_report_payment'
import { ReportPaymentRepository } from '../../../packages/report/features/payments/domain/report_payment_repository'
import { ExportReportImageGraphData } from '../../../packages/report/infrastructure/export_report_image_graph_data'
import { BaseException } from '../../../packages/shared/domain/exceptions/BaseException'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'
import { NotImplementedException } from '../../../packages/shared/domain/exceptions/NotImplementedException'
import { SubTypeNotExistException } from '../../../packages/shared/domain/exceptions/SubTypeNotExistException'
import { ValidURL } from '../../../packages/shared/domain/value_objects/valid_url'
import {
	dateToUTC,
	getMonthName,
	getStartAndEndOfMonth
} from '../../../packages/shared/utils/parse_date'
import { wrapType } from '../../../packages/shared/utils/wrap_type'
import { PDFDocument } from 'pdf-lib'

@Injectable()
export class CreateReportService {
	constructor(
		private readonly repo: ReportDAO,
		private readonly reportPaymentRepository: ReportPaymentRepository
	)
	{}

	async execute( type: string ): Promise<ValidURL> {
		let data: Uint8Array = new Uint8Array()
		let name: string     = ''

		const reportTypeResult = wrapType( () => ReportType.from( type ) )

		if ( reportTypeResult instanceof BaseException ) {
			throw [ reportTypeResult ]
		}

		if ( reportTypeResult.value === ReportTypeEnum.sale ) {

			const currentDate = new Date()
			const { start: from, end: to } = getStartAndEndOfMonth( currentDate )

			const payments = await GetAllReportPayment( this.reportPaymentRepository,
				{
					from_date: from,
					to_date  : to
				} )

			if ( payments instanceof Errors ) {
				throw [ ...payments.values ]
			}

			const monthName = getMonthName( currentDate )
			const exportDataFormat = await ReportSaleMethod( `Sales ${monthName}`, payments )

			if ( exportDataFormat instanceof Errors ) {
				throw [ ...exportDataFormat.values ]
			}

			name = exportDataFormat.title

			const imageResult = await ExportReport( new ExportReportImageGraphData(),
				exportDataFormat )

			if ( imageResult instanceof Errors ) {
				throw [ ...imageResult.values ]
			}

			data = imageResult
		}
		else if ( reportTypeResult.value === ReportTypeEnum.performance ) {
			throw [ new NotImplementedException() ]
		}
		else {
			throw [ new SubTypeNotExistException( 'report' ) ]
		}

		const result = await CreateReport( this.repo, {
			type: reportTypeResult,
			name: `${ dateToUTC( new Date() ) }-${ name.toLowerCase() }.png`,
			data
		} )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}

async function generatePDFData( image: Buffer )
{
	const doc      = await PDFDocument.create()
	const imageDoc = await doc.embedPng( image )
	const page     = doc.addPage()
	page.drawImage( imageDoc )
	return await doc.save()
}
