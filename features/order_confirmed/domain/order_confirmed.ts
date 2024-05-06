import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'

export class OrderConfirmed{
	constructor(
		readonly id: UUID,
		readonly creation_date: ValidDate,
		readonly accountant_email?: Email,
	){}
}