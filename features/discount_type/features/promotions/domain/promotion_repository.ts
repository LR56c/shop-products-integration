import {
	PromotionResponse
} from './promotion_response'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'
import {
    PromotionProduct,
} from './promotion'
import { ValidString } from '../../../../shared/domain/value_objects/ValidString'

export abstract class PromotionRepository {
	abstract linkProducts(promotion_id : UUID, products: PromotionProduct[] ): Promise<boolean>

	abstract getAll( from: ValidInteger, to: ValidInteger,
		name ?: ValidString, from_date?: ValidDate, to_date?: ValidDate ): Promise<PromotionResponse[]>

	abstract getByID( id: UUID ): Promise<PromotionResponse>
}
