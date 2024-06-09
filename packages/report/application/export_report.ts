import { ExportReportFormat } from 'packages/report/domain/models/export_report_format'
import { ExportReportRepository } from 'packages/report/domain/repository/export_report_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'
import { wrapTypeErrors } from 'packages/shared/utils/wrap_type'

export const ExportReport = async ( repo : ExportReportRepository, data : ExportReportFormat ): Promise<Buffer | Errors> => {
	return await wrapTypeErrors(()=>repo.format(data))
}
