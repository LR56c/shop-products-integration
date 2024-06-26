import { ItemConfirmed } from '../../item_confirmed/domain/item_confirmed'
import { OrderConfirmed } from '../../order_confirmed/domain/order_confirmed'
import { Payment } from '../../payments/domain/models/payment'
import { Product } from '../../products/domain/models/product'
import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'

export class OrderResponse {
	constructor(
		readonly id: UUID,
		readonly client_email: Email,
		readonly creation_date: ValidDate,
		readonly payment: Payment,
		readonly products: OrderProductResponse[],
		readonly seller_email?: Email,
		readonly order_confirmed?: OrderConfirmed,
		readonly item_confirmed?: ItemConfirmed
	)
	{}
}

export class OrderProductResponse {
	constructor(
		readonly quantity: ValidInteger,
		readonly product: Product
	)
	{}
}
