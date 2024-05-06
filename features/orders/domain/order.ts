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
				readonly products: Product[],
				readonly seller_email?: Email,
				readonly order_confirmed?: OrderConfirmed,
				readonly item_confirmed?: ItemConfirmed
		){}
	//TODO: se podria agregar status. aparte de agregar update partial
}

export class PartialOrder{
	constructor(
		readonly client_email: Email,
		readonly payment_id: UUID,
		readonly products_ids: UUID[],
		readonly seller_email?: Email,
		readonly order_confirmed?: UUID,
		readonly item_confirmed?: UUID,
	){}
}
