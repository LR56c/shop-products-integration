import { UUID } from '../../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../../shared/domain/value_objects/valid_integer'

export class ReportPayment {
	constructor(
		readonly id: UUID,
		readonly date: ValidDate,
		readonly value: ValidInteger )
	{}
}
