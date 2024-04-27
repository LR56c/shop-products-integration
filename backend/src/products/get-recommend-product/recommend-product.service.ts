import { Injectable } from '@nestjs/common'
import { Product } from '~features/products/domain/models/product'
import { GetRecommendProducts } from '~features/products/application/get_recommend_products'
import { ProductRepository } from '~features/products/domain/repository/product_repository'

@Injectable()
export class RecommendProductService {
	constructor( private repository: ProductRepository ) {}

	async recommendProducts( threshold: string, products: Product[],
		from: string, to: string )
	{
		return GetRecommendProducts( this.repository, {
			threshold: threshold,
			products,
			from     : from,
			to       : to
		} )
	}
}
