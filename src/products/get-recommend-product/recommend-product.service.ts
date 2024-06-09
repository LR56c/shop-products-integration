import { Injectable } from '@nestjs/common'
import { GetRecommendProductsGroupByCategory } from 'packages/products/application/get_recommend_products'
import { ProductResponse } from 'packages/products/domain/models/product_response'
import { ProductRepository } from 'packages/products/domain/repository/product_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'
import { GetRecommendProductDto } from '../shared/dto/get_recommend_product_dto'

@Injectable()
export class RecommendProductService {
	constructor( private repository: ProductRepository ) {}

	async recommendProductsGroupByCateogry( dto: GetRecommendProductDto ): Promise<Map<string, ProductResponse[]>>
	{
		const result = await GetRecommendProductsGroupByCategory( this.repository, {
			threshold        : dto.threshold,
			recommendProducts: dto.products,
			limit            : dto.limit
		} )

		if( result instanceof Errors ) {
			throw [...result.values]
		}
		return result
	}
}
