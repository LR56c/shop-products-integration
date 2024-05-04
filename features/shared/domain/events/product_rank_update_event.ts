import { ValidRank } from '../value_objects/ValidRank'
import { ValidString } from '../value_objects/ValidString'

export class ProductRankUpdateEvent {
	static tag = 'ProductRankUpdateEvent'

	constructor(
		public readonly product_code: ValidString,
		public readonly average_value: ValidRank
	)
	{}
}
