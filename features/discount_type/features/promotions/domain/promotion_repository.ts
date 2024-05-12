import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'
import { Promotion } from './promotion'
import { ValidString } from '../../../../shared/domain/value_objects/ValidString'
import { Product } from '../../../../products/domain/models/product'

export abstract class PromotionRepository {
	abstract discount( products: Product[] ): Promise<boolean>
	abstract linkProducts(promotion_id : UUID, products_ids: UUID[] ): Promise<boolean>

	abstract getAll( from: ValidInteger, to: ValidInteger,
		name ?: ValidString, from_date?: ValidDate, to_date?: ValidDate ): Promise<Promotion[]>

	abstract getByID( id: UUID ): Promise<Promotion>
}
