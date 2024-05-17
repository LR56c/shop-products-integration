import {
	IsDate,
	IsEnum,
	IsNumber,
	IsUUID,
	Max,
	Min
} from 'class-validator'
import { DiscountTypeEnum } from '~features/discount_type/domain/discount_type'

export class DiscountDto {
	@IsUUID()
	id: string

	@IsEnum( DiscountTypeEnum )
	type: string

	@Min( 0 )
	@Max( 100 )
	@IsNumber()
	percentage: number

	@IsDate()
	creation_date: Date

	@IsDate()
	start_date: Date

	@IsDate()
	end_date: Date
}
