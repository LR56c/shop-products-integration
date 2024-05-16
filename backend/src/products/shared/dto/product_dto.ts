import {
	IsDate,
	IsInt,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
	IsUUID,
	Max,
	Min,
	MinLength
} from 'class-validator'

export class ProductDto{
	@IsOptional()
	@IsUUID()
	id : string

	@MinLength(1)
	@IsString()
	code : string

	@MinLength(1)
	@IsString()
	product_code : string

	@MinLength(1)
	@IsString()
	name : string

	@MinLength(1)
	@IsString()
	description : string

	@IsDate()
	created_at : Date

	@MinLength(1)
	@IsString()
	brand : string

	@Min(0)
	@IsInt()
	price : number

	@IsUrl()
	image_url : string

	@Min(0)
	@IsInt()
	stock : number

	@Min(0)
	@Max(5)
	@IsNumber()
	average_rank : number

	@MinLength(1)
	@IsString()
	category : string

	@IsOptional()
	@IsUUID()
	discount : string
}
