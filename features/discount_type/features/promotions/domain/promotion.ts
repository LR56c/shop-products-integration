import { ValidInteger } from '../../../../shared/domain/value_objects/valid_integer'
import { UUID } from '../../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import { ValidPercentage } from '../../../../shared/domain/value_objects/valid_percentage'
import { ValidString } from '../../../../shared/domain/value_objects/valid_string'
import { Discount } from '../../../domain/discount'
import {
	DiscountType,
	DiscountTypeEnum
} from '../../../domain/discount_type'

export class Promotion extends Discount {
	constructor(
		readonly id: UUID,
		readonly name: ValidString,
		readonly percentage: ValidPercentage,
		readonly creation_date: ValidDate,
		readonly end_date: ValidDate,
		readonly start_date: ValidDate,
		readonly products: PromotionProduct[]
	)
	{
		super( id, DiscountType.from( DiscountTypeEnum.PROMOTION ),
			percentage, creation_date, start_date, end_date
		)
	}
}

export class PromotionProduct {
	constructor(
		readonly quantity: ValidInteger,
		readonly product: UUID
	)
	{}
}

