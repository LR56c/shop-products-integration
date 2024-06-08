import { UUID } from '../../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../../shared/domain/value_objects/ValidDate'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'
import { ValidURL } from '../../../shared/domain/value_objects/ValidURL'
import { ReportType } from './report_type'

export class Report {
	constructor(
		readonly id: UUID,
		readonly name: ValidString,
		readonly url: ValidURL,
		readonly type: ReportType,
		readonly creationDate: ValidDate
	)
	{ }

}
