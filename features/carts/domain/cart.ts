import { Product } from '../../products/domain/models/product'
import { Email } from '../../shared/domain/value_objects/Email'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'

export class Cart{
	constructor(
		readonly userEmail: Email,
		readonly product: Product,
		readonly quantity: ValidInteger
	) {}
}

export class CartUser {
	constructor(
		readonly userEmail: Email,
		readonly products: CartProduct[]
	) {}
}

export class CartProduct{
	constructor(
		readonly quantity: ValidInteger,
		readonly product: Product
	) {}
}
