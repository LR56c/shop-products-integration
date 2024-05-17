import { Injectable } from '@nestjs/common'
import { GetRecommendProductsGroupByCategory } from '~features/products/application/get_recommend_products'
import { ProductResponse } from '~features/products/domain/models/product_response'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { GetRecommendProductDto } from '../shared/dto/get_recommend_product_dto'

@Injectable()
export class RecommendProductService {
	constructor( private repository: ProductRepository ) {}

	async recommendProductsGroupByCateogry( dto: GetRecommendProductDto ): Promise<Map<string, ProductResponse[]>>
	{
		return GetRecommendProductsGroupByCategory( this.repository, {
			threshold        : dto.threshold,
			recommendProducts: dto.products,
			limit            : dto.limit
		} )
	}
}
