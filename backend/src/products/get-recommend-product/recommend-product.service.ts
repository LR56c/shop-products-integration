import { Injectable } from '@nestjs/common'
import { Product } from '~features/products/domain/models/product'
import { GetRecommendProductsGroupByCateogry } from '~features/products/application/get_recommend_products'
import { ProductRepository } from '~features/products/domain/repository/product_repository'

@Injectable()
export class RecommendProductService {
	constructor( private repository: ProductRepository ) {}

	async recommendProductsGroupByCateogry( threshold: string, products: Product[],
		limit: number ) : Promise<Map<string, Product[]>>
	{
		return GetRecommendProductsGroupByCateogry( this.repository, {
			threshold: threshold,
			products,
			limit     : limit,
		} )
	}
}
