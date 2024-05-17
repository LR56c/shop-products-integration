import { Injectable } from '@nestjs/common'
import { ReportRepository } from '~features/report/domain/repository/report_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class DeleteReportService {
	constructor( private repo: ReportRepository ) {}

	async deleteReport( id: UUID ): Promise<boolean> {
		return this.repo.deleteReport( id )
	}
}
