import { ItemConfirmed } from './item_confirmed'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'

export abstract class ItemConfirmedRepository {
	abstract create( order_confirmed: ItemConfirmed ): Promise<boolean>
	abstract delete( id: UUID ): Promise<boolean>
	abstract getAll( from: ValidInteger, to: ValidInteger ): Promise<ItemConfirmed[]>
	abstract get( id: UUID ): Promise<ItemConfirmed>
}
