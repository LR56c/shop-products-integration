import { ExportReportFormat } from 'packages/report/domain/models/export_report_format'

export abstract class ExportReportRepository {
	abstract format(data : ExportReportFormat): Promise<Buffer>
}
