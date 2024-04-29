export class ProductRankUpdateEvent {
	static tag = 'ProductRankUpdateEvent'

	constructor(
		public readonly code: string,
		public readonly rank: number
	)
	{}
}
