import {
	IsArray,
	IsDate,
	IsNumber,
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
	@IsNumber()
	percentage : number

	@IsDate()
	created_at : Date

	@IsDate()
	end_date : Date

	@IsDate()
	start_date : Date

	@IsArray()
	@IsUUID( '4', {
		each: true
	} )
	products_ids: string[]
}
