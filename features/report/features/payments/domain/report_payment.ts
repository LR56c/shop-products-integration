import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'

export class ReportPayment {
	constructor(
		readonly id: UUID,
		readonly date: ValidDate,
		readonly value: ValidInteger )
	{}
}
