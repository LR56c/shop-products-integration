import { Injectable } from '@nestjs/common'
import { Product } from '~features/products/domain/models/product'
import { RecommendProduct } from '~features/products/domain/models/recommend_product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidRank } from '~features/shared/domain/value_objects/ValidRank'

@Injectable()
export class RecommendProductService {
	constructor( private repository: ProductRepository ) {}

	async recommendProductsGroupByCateogry( threshold: ValidRank,
		products: RecommendProduct[], limit: ValidInteger ): Promise<Map<string, Product[]>>
	{
		return this.repository.getRecommendProductsGroupByCategory( threshold,
			products, limit )
	}
}
