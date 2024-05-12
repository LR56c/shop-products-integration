import { UUID } from '../../shared/domain/value_objects/UUID'
import { Discount } from './discount'

export abstract class DiscountRepository {
	abstract create( discount: Discount ): Promise<boolean>

	abstract remove( id: UUID ): Promise<boolean>
}
