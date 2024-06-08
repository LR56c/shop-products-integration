import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'

export class Order {
	constructor(
		readonly id: UUID,
		readonly client_email: Email,
		readonly creation_date: ValidDate,
		readonly payment: UUID,
		readonly products: OrderProduct[],
		readonly seller_email?: Email,
		readonly order_confirmed?: UUID,
		readonly item_confirmed?: UUID
	)
	{}

	//TODO: se podria agregar status
}

export class OrderProduct {
	constructor(
		readonly quantity: ValidInteger,
		readonly product: UUID
	)
	{}
}
