import { Type } from 'class-transformer'
import {
	IsDate,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
	Max,
	Min,
	MinLength,
	ValidateNested
} from 'class-validator'

export class PromotionDto {
	@IsOptional()
	@IsUUID()
	id: string

	@MinLength( 1 )
	@IsString()
	name: string

	@Min( 0 )
	@Max( 100 )
	@IsNumber()
	percentage: number

	@IsDate()
	created_at: Date

	@IsDate()
	end_date: Date

	@IsDate()
	start_date: Date

	@ValidateNested()
	@Type( () => PromotionProductDto )
	products: PromotionProductDto[]
}

export class DiscounDto {
	@ValidateNested()
	@Type( () => PromotionProductDto )
	products: PromotionProductDto[]
}

export class PromotionProductDto {
	@IsUUID()
	product_id: string

	@Min( 1 )
	@IsNumber()
	quantity: number
}
