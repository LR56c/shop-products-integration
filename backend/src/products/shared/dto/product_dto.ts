import { Type } from 'class-transformer'
import {
	IsDate,
	IsDecimal,
	IsInt,
	IsNumber,
	IsOptional,
	IsString,
	IsUrl,
	IsUUID,
	Max,
	Min,
	MinLength,
	ValidateNested
} from 'class-validator'
import { SaleDto } from 'src/products/shared/dto/sale_dto'

export class ProductDto{
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

	@IsNumber()
	average_rank : number

	@MinLength(1)
	@IsString()
	category : string

	@IsOptional()
	@ValidateNested()
	@Type( () => SaleDto )
	sale : SaleDto
}
