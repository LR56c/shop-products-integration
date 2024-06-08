import { UUID } from '../../shared/domain/value_objects/uuid'
import { Discount } from './discount'

export abstract class DiscountRepository {
	abstract create( discount: Discount ): Promise<boolean>

	abstract remove( id: UUID ): Promise<boolean>
}
