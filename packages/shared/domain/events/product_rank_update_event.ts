import { UUID } from '../value_objects/uuid'
import { ValidRank } from '../value_objects/valid_rank'

export class ProductRankUpdateEvent {
	static tag = 'ProductRankUpdateEvent'

	constructor(
		public readonly product_id: UUID,
		public readonly average_value: ValidRank
	)
	{}
}
