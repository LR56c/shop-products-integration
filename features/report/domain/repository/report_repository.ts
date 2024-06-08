import { UUID } from '../../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'
import { ValidURL } from '../../../shared/domain/value_objects/ValidURL'
import { Report } from '../models/report'
import { ReportType } from '../models/report_type'

export abstract class ReportRepository {
	abstract createReport( type: ReportType, name: ValidString,
		data: Uint8Array ): Promise<ValidURL>

	abstract deleteReport( id: UUID ): Promise<boolean>

	abstract getReport( from: ValidInteger, to: ValidInteger, type?: ReportType,
		from_date?: ValidDate, to_date?: ValidDate ): Promise<Report[]>
}
