import { ValidDate } from 'features/shared/domain/value_objects/ValidDate'
import { ValidPercentage } from 'features/shared/domain/value_objects/ValidPercentage'
import { DiscountType } from './discount_type'
import { UUID } from '../../shared/domain/value_objects/UUID'

export abstract class Discount {
	constructor(
		readonly id: UUID,
		readonly type: DiscountType,
		readonly percentage: ValidPercentage,
		readonly creation_date: ValidDate,
		readonly start_date: ValidDate,
		readonly end_date: ValidDate,
	) {}
}

export type DiscountParentProps = {
	id: UUID
	type: DiscountType
	percentage: ValidPercentage
	creation_date: ValidDate
	start_date: ValidDate
	end_date: ValidDate
}
