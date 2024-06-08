import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { OrderConfirmed } from './order_confirmed'

export abstract class OrderConfirmedRepository {
	abstract create( order_confirmed: OrderConfirmed ): Promise<boolean>

	abstract delete( id: UUID ): Promise<boolean>

	abstract getAll( from: ValidInteger,
		to: ValidInteger ): Promise<OrderConfirmed[]>

	abstract get( id: UUID ): Promise<OrderConfirmed>
}
