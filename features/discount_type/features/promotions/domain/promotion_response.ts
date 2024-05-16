import { Discount } from '../../../domain/discount'
import {
	DiscountType,
	DiscountTypeEnum
} from '../../../domain/discount_type'
import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { Product } from '../../../../products/domain/models/product'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'
import { ValidPercentage } from '../../../../shared/domain/value_objects/ValidPercentage'
import { ValidString } from '../../../../shared/domain/value_objects/ValidString'

export class PromotionResponse extends Discount{
	constructor(
		readonly id: UUID,
		readonly name: ValidString,
		readonly percentage: ValidPercentage,
		readonly creation_date: ValidDate,
		readonly end_date: ValidDate,
		readonly start_date: ValidDate,
		readonly products: PromotionProductResponse[],
	){
		super( id, DiscountType.from( DiscountTypeEnum.PROMOTION ),
			percentage, creation_date, start_date, end_date
		)
	}
}

export class PromotionProductResponse {
	constructor(
		readonly quantity: ValidInteger,
		readonly product : Product
	){}
}
