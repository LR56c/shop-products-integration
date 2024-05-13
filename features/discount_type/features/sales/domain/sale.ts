import { Discount } from '../../../domain/discount'
import {
	DiscountType,
	DiscountTypeEnum
} from '../../../domain/discount_type'
import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { ValidPercentage } from '../../../../shared/domain/value_objects/ValidPercentage'

export class Sale extends Discount{
			constructor(
				readonly id: UUID,
				readonly product_id: UUID,
				readonly percentage: ValidPercentage,
				readonly creation_date: ValidDate,
				readonly start_date: ValidDate,
				readonly end_date: ValidDate,
		) {
				super( id, DiscountType.from( DiscountTypeEnum.SALE ) ,
					percentage, creation_date, start_date, end_date)
			}
}
