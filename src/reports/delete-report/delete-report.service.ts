import { Injectable } from '@nestjs/common'
import { ReportDAO } from 'packages/report/domain/repository/report_dao'
import { UUID } from 'packages/shared/domain/value_objects/uuid'

@Injectable()
export class DeleteReportService {
	constructor( private repo: ReportDAO ) {}

	async deleteReport( id: UUID ): Promise<boolean> {
		return this.repo.delete( id )
	}
}
