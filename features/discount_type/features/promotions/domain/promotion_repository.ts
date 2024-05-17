import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../../../shared/domain/value_objects/ValidString'
import { PromotionProduct } from './promotion'
import { PromotionResponse } from './promotion_response'

export abstract class PromotionRepository {
	abstract linkProducts( promotion_id: UUID,
		products: PromotionProduct[] ): Promise<boolean>

	abstract getAll( from: ValidInteger, to: ValidInteger,
		name ?: ValidString, from_date?: ValidDate,
		to_date?: ValidDate ): Promise<PromotionResponse[]>

	abstract getByID( id: UUID ): Promise<PromotionResponse>
}
