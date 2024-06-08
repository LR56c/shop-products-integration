import { UUID } from '../value_objects/uuid'

export class OrderConfirmedEvent {
	static tag = 'OrderConfirmedEvent'

	constructor(
		public readonly order_id: UUID,
		public readonly confirmed_id: UUID
	)
	{}
}
