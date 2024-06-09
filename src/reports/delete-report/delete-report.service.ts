import { Injectable } from '@nestjs/common'
import { ReportRepository } from 'packages/report/domain/repository/report_repository'
import { UUID } from 'packages/shared/domain/value_objects/uuid'

@Injectable()
export class DeleteReportService {
	constructor( private repo: ReportRepository ) {}

	async deleteReport( id: UUID ): Promise<boolean> {
		return this.repo.deleteReport( id )
	}
}
