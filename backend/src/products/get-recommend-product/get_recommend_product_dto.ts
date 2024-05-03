import { Type } from 'class-transformer'
import {
	IsInt,
	Max,
	Min,
	ValidateNested
} from 'class-validator'
import { ProductDto } from 'src/products/shared/dto/product_dto'

export class GetRecommendProductDto {
	@Max(5)
	@Min(0)
	@IsInt()
	threshold: number

	@Min(0)
	@IsInt()
	limit: number

	@ValidateNested()
	@Type( () => ProductDto )
	products: ProductDto[]
}
