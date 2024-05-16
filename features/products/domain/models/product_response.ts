import { Discount } from '../../../discount_type/domain/discount'
import { ValidRank } from '../../../shared/domain/value_objects/ValidRank'
import { UUID } from '../../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'
import { ValidURL } from '../../../shared/domain/value_objects/ValidURL'

export class ProductResponse {
	constructor(
		readonly id: UUID,
		readonly code: ValidString,
		readonly product_code: ValidString,
		readonly name: ValidString,
		readonly description: ValidString,
		readonly created_at: ValidDate,
		readonly brand: ValidString,
		readonly price: ValidInteger,
		readonly image_url: ValidURL,
		readonly stock: ValidInteger,
		readonly average_rank: ValidRank,
		readonly category: ProductCategory,
		readonly discount?: Discount
	) {}
}


export class ProductCategory {
	constructor(
		readonly name: ValidString
	) {}
}
