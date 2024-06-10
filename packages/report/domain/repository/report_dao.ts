import { UUID } from '../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../../shared/domain/value_objects/valid_string'
import { ValidURL } from '../../../shared/domain/value_objects/valid_url'
import { Report } from '../models/report'
import { ReportType } from '../models/report_type'

export abstract class ReportDAO {
	abstract create( type: ReportType, name: ValidString,
		data: Uint8Array ): Promise<ValidURL>

	abstract delete( id: UUID ): Promise<boolean>

	abstract getAll( from: ValidInteger, to: ValidInteger, type?: ReportType,
		from_date?: ValidDate, to_date?: ValidDate ): Promise<Report[]>
}
