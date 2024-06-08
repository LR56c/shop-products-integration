import { Discount } from '../../../domain/discount'
import {
	DiscountType,
	DiscountTypeEnum
} from '../../../domain/discount_type'
import { UUID } from '../../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import { ValidPercentage } from '../../../../shared/domain/value_objects/valid_percentage'

export class Sale extends Discount {
	constructor(
		readonly id: UUID,
		readonly product_id: UUID,
		readonly percentage: ValidPercentage,
		readonly creation_date: ValidDate,
		readonly start_date: ValidDate,
		readonly end_date: ValidDate
	)
	{
		super( id, DiscountType.from( DiscountTypeEnum.SALE ),
			percentage, creation_date, start_date, end_date )
	}
}
