import { Payment } from '../../../payments/domain/models/payment'

export class PaymentProcessedEvent {
	static tag = 'PaymentProcessedEvent'

	constructor(
		readonly payment: Payment,
	)
	{}
}
