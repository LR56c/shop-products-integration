import { UUID } from '../value_objects/UUID'

export class ItemConfirmedEvent {
	static tag = 'ItemConfirmedEvent'

	constructor(
		public readonly order_id: UUID,
		public readonly confirmed_id: UUID
	)
	{}
}
