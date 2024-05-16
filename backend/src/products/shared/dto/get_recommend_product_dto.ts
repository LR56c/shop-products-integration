import { Type } from 'class-transformer'
import {
	IsInt,
	IsString,
	IsUUID,
	Max,
	Min,
	MinLength,
	ValidateNested
} from 'class-validator'

export class GetRecommendProductDto {
	@Max(5)
	@Min(0)
	@IsInt()
	threshold: number

	@Min(0)
	@IsInt()
	limit: number

	@ValidateNested()
	@Type( () => RecommendedProductDto )
	products: RecommendedProductDto[]
}

export class RecommendedProductDto {
	@IsUUID()
	id : string

	@MinLength(1)
	@IsString()
	category: string
}
