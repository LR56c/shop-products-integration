import { PaymentMethod } from '../../../payments/domain/models/payment_method'
import { ValidBool } from '../value_objects/ValidBool'
import { ValidDate } from '../value_objects/ValidDate'
import { ValidInteger } from '../value_objects/ValidInteger'
import { ValidString } from '../value_objects/ValidString'
import { UUID } from '../value_objects/UUID'

export class PaymentProcessedEvent {
	static tag = 'PaymentProcessedEvent'

	constructor(
		readonly id: UUID,
		readonly creationDate: ValidDate,
		readonly approved: ValidBool,
		readonly deliveryName: ValidString,
		readonly paymentValue: ValidInteger,
		readonly paymentMethod: PaymentMethod
	)
	{}
}
