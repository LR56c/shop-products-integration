import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ItemConfirmed } from './item_confirmed'

export abstract class ItemConfirmedRepository {
	abstract create( order_confirmed: ItemConfirmed ): Promise<boolean>

	abstract delete( id: UUID ): Promise<boolean>

	abstract getAll( from: ValidInteger,
		to: ValidInteger ): Promise<ItemConfirmed[]>

	abstract get( id: UUID ): Promise<ItemConfirmed>
}
