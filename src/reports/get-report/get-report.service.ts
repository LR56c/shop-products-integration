import { Injectable } from '@nestjs/common'
import { Report } from 'packages/report/domain/models/report'
import { ReportType } from 'packages/report/domain/models/report_type'
import { ReportRepository } from 'packages/report/domain/repository/report_repository'
import { ValidDate } from 'packages/shared/domain/value_objects/valid_date'
import { ValidInteger } from 'packages/shared/domain/value_objects/valid_integer'

@Injectable()
export class GetReportService {
	constructor( private repo: ReportRepository ) {
	}

	async getReport( from: ValidInteger, to: ValidInteger, type?: ReportType,
		from_date?: ValidDate, to_date?: ValidDate ): Promise<Report[]> {
		return this.repo.getReport( from, to, type, from_date, to_date )
	}
}