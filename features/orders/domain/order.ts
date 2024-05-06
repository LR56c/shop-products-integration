import { Payment } from '../../payments/domain/models/payment'
import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidBool } from '../../shared/domain/value_objects/ValidBool'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'

export class Order{
			constructor(
				readonly id: UUID,
				readonly seller_email: Email,
				readonly client_email: Email,
				readonly creation_date: ValidDate,
				readonly approved : ValidBool,
				readonly payment: Payment,
		){}
}
