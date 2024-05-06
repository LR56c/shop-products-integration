import { ValidBool } from 'features/shared/domain/value_objects/ValidBool'
import { ValidDate } from 'features/shared/domain/value_objects/ValidDate'
import { Order } from './order'
import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'

export abstract class OrderRepository {
	abstract createOrder( id: UUID,
		seller_email: Email,
		client_email: Email,
		creation_date: ValidDate,
		approved: ValidBool,
		payment_id: UUID ): Promise<boolean>

	abstract deleteOrder( id: UUID ): Promise<boolean>

	abstract getAll( from: ValidInteger, to: ValidInteger,
		client_email ?: Email ): Promise<Order[]>

	abstract getOrder( id: UUID ): Promise<Order>

	abstract updateOrder(  id: UUID,
		seller_email: Email,
		client_email: Email,
		creation_date: ValidDate,
		approved: ValidBool,
		payment_id: UUID  ): Promise<boolean>
}
