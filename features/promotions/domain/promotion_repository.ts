import { Product } from '../../products/domain/models/product'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { Promotion } from './promotion'

export abstract class PromotionRepository {
	abstract add( promotion: Promotion ): Promise<boolean>

	abstract remove( id: UUID ): Promise<boolean>

	abstract update( id: UUID, promotion: Promotion ): Promise<boolean>

	abstract discount( products: Product[] ): Promise<boolean>

	abstract getAll( from: ValidInteger, to: ValidInteger, name?: ValidString,
		from_date?: ValidDate, to_date?: ValidDate ): Promise<Promotion[]>

	abstract getByID( id: UUID ): Promise<Promotion>
}
