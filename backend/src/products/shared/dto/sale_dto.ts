import {
	IsDate,
	IsDecimal,
	IsString,
	IsUUID,
	Max,
	Min,
	MinLength
} from 'class-validator'

export class SaleDto{
	@IsUUID()
	id : string

	@Max(100)
	@Min(0)
	@IsDecimal()
	percentage : number

	@MinLength(1)
	@IsString()
	product_code : string

	@IsDate()
	creation_date : Date

	@IsDate()
	start_date : Date

	@IsDate()
	end_date : Date
}
