import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { Order } from './order'
import { OrderResponse } from './order_response'

export abstract class OrderRepository {
	abstract createOrder( order: Order ): Promise<boolean>

	abstract deleteOrder( id: UUID ): Promise<boolean>

	abstract getAll( from: ValidInteger, to: ValidInteger,
		client_email ?: Email ): Promise<OrderResponse[]>

	abstract getOrder( id: UUID ): Promise<OrderResponse>

	abstract updateOrder( id: UUID, order: Order ): Promise<boolean>
}
