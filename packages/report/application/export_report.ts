import { ExportReportFormat } from '../domain/models/export_report_format'
import { ExportReportRepository } from '../domain/repository/export_report_repository'
import { Errors } from '../../shared/domain/exceptions/errors'
import { wrapTypeErrors } from '../../shared/utils/wrap_type'

export const ExportReport = async ( repo : ExportReportRepository, data : ExportReportFormat ): Promise<Buffer | Errors> => {
	return await wrapTypeErrors(()=>repo.format(data))
}
