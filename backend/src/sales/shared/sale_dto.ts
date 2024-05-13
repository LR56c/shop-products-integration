import {
	IsDate,
	IsNumber,
	IsString,
	IsUUID,
	Max,
	Min,
	MinLength
} from 'class-validator'

export class SaleDto{
	@IsUUID()
	id : string

	@IsUUID()
	product_id : string

	@Min(0)
	@Max(100)
	@IsNumber()
	percentage : number

	@IsDate()
	created_at : Date

	@IsDate()
	end_date : Date

	@IsDate()
	start_date : Date

}
