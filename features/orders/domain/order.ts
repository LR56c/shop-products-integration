import { ValidInteger } from 'features/shared/domain/value_objects/ValidInteger'
import { ItemConfirmed } from '../../item_confirmed/domain/item_confirmed'
import { OrderConfirmed } from '../../order_confirmed/domain/order_confirmed'
import { Product } from '../../products/domain/models/product'
import { Payment } from '../../payments/domain/models/payment'
import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'

export class Order{
			constructor(
				readonly id: UUID,
				readonly client_email: Email,
				readonly creation_date: ValidDate,
				readonly payment: Payment,
				readonly products: OrderProduct[],
				readonly seller_email?: Email,
				readonly order_confirmed?: OrderConfirmed,
				readonly item_confirmed?: ItemConfirmed
		){}
	//TODO: se podria agregar status.
	// agregar update partial
	// posts, devolver id generado
	// a valores nulos, mostrar en json que son nulos
}

export class OrderProduct {
	constructor(
		readonly quantity: ValidInteger,
		readonly product: Product,
	){}
}

export class PartialOrder{
	constructor(
		readonly client_email: Email,
		readonly payment_id: UUID,
		readonly products: PartialOrderProduct[],
		readonly seller_email?: Email,
		readonly order_confirmed?: UUID,
		readonly item_confirmed?: UUID,
	){}
}

export class PartialOrderProduct{
	constructor(
		readonly quantity: ValidInteger,
		readonly product_id: UUID,
	){}
}
