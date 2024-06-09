import { Discount } from '../../../discount_type/domain/discount'
import { ValidRank } from '../../../shared/domain/value_objects/valid_rank'
import { UUID } from '../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../../shared/domain/value_objects/valid_string'
import { ValidURL } from '../../../shared/domain/value_objects/valid_url'

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
	)
	{}
}


export class ProductCategory {
	constructor(
		readonly name: ValidString
	)
	{}
}
