import {
	Order,
	PartialOrder
} from './order'
import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'

export abstract class OrderRepository {
	abstract createOrder(order : PartialOrder): Promise<boolean>

	abstract deleteOrder( id: UUID ): Promise<boolean>

	abstract getAll( from: ValidInteger, to: ValidInteger,
		client_email ?: Email ): Promise<Order[]>

	abstract getOrder( id: UUID ): Promise<Order>

	abstract updateOrder(id : UUID, order : PartialOrder): Promise<boolean>
}
