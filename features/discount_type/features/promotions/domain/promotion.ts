import { Product } from 'features/products/domain/models/product'
import { ValidInteger } from 'features/shared/domain/value_objects/ValidInteger'
import { Discount } from '../../../domain/discount'
import {
	DiscountType,
	DiscountTypeEnum
} from '../../../domain/discount_type'
import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { ValidPercentage } from '../../../../shared/domain/value_objects/ValidPercentage'
import { ValidString } from '../../../../shared/domain/value_objects/ValidString'

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
export class PromotionProduct{
	constructor(
		readonly quantity: ValidInteger,
		readonly product : Product
	){}
}

export class PartialPromotion{
	constructor(
		readonly name: ValidString,
		readonly percentage: ValidPercentage,
		readonly creation_date: ValidDate,
		readonly end_date: ValidDate,
		readonly start_date: ValidDate,
		readonly products: PartialPromotionProduct[],
	){}
}

export class PartialPromotionProduct{
	constructor(
		readonly quantity: ValidInteger,
		readonly product_id: UUID,
	){}
}
