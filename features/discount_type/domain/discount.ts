import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidPercentage } from '../../shared/domain/value_objects/valid_percentage'
import { DiscountType } from './discount_type'
import { UUID } from '../../shared/domain/value_objects/uuid'

export class Discount {
	constructor(
		readonly id: UUID,
		readonly type: DiscountType,
		readonly percentage: ValidPercentage,
		readonly creation_date: ValidDate,
		readonly start_date: ValidDate,
		readonly end_date: ValidDate
	)
	{}
}

export type DiscountParentProps = {
	id: UUID
	type: DiscountType
	percentage: ValidPercentage
	creation_date: ValidDate
	start_date: ValidDate
	end_date: ValidDate
}
