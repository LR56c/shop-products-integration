import { Discount } from 'features/discount_type/domain/discount'
import { UUID } from '../value_objects/UUID'

export class DiscountCreatedEvent {
	static tag = 'DiscountCreatedEvent'

	constructor(
		public readonly discount: Discount,
		public readonly product_id: UUID
	)
	{}
}
