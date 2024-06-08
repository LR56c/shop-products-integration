import { Product } from '../../products/domain/models/product'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'

export class CartProductResponse {
	constructor(
		readonly quantity: ValidInteger,
		readonly product: Product
	)
	{}
}
