import { ValidString } from '../../../shared/domain/value_objects/valid_string'
import { ReportType } from './report_type'
import { UUID } from '../../../shared/domain/value_objects/uuid'
import { ValidURL } from '../../../shared/domain/value_objects/valid_url'
import { ValidDate } from '../../../shared/domain/value_objects/valid_date'

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
