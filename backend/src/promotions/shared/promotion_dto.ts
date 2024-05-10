import {
	IsDate,
	IsDecimal,
	IsString,
	IsUUID,
	Max,
	Min,
	MinLength
} from 'class-validator'

export class PromotionDto{
	@IsUUID()
	id : string

	@MinLength( 1 )
	@IsString()
	name : string

	@Min(0)
	@Max(100)
	@IsDecimal()
	percentage : number

	@IsDate()
	creation_date : Date

	@IsDate()
	end_date : Date

	@IsDate()
	start_date : Date
}
