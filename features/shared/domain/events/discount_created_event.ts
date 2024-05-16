export class DiscountCreatedEvent {
	static tag = 'DiscountCreatedEvent'

	constructor(
		public readonly discount_id: string,
		public readonly product_id: string
	)
	{}
}
