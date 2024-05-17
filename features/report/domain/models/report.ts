import { ValidString } from '../../../shared/domain/value_objects/ValidString'
import { ReportType } from './report_type'
import { UUID } from '../../../shared/domain/value_objects/UUID'
import { ValidURL } from '../../../shared/domain/value_objects/ValidURL'
import { ValidDate } from '../../../shared/domain/value_objects/ValidDate'

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
