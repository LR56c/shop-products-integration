import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'

export class OrderConfirmed {
	constructor(
		readonly id: UUID,
		readonly creation_date: ValidDate,
		readonly accountant_email?: Email
	)
	{}
}
