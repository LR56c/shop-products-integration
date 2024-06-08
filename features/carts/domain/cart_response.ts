import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { Product } from '../../products/domain/models/product'

export class CartProductResponse {
	constructor(
		readonly quantity: ValidInteger,
		readonly product: Product
	)
	{}
}
