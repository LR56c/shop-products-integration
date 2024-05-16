import { UUID } from '../value_objects/UUID'
import { ValidRank } from '../value_objects/ValidRank'

export class ProductRankUpdateEvent {
	static tag = 'ProductRankUpdateEvent'

	constructor(
		public readonly product_id: UUID,
		public readonly average_value: ValidRank
	)
	{}
}
