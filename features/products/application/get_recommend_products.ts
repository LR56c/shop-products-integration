import { ValidInteger } from 'features/shared/domain/value_objects/ValidInteger'
import { Product } from '../domain/models/product'
import { ProductRepository } from '../domain/repository/product_repository'

export const GetRecommendProductsGroupByCateogry = async ( repo: ProductRepository, props: {
	threshold: ValidInteger,
	products: Product[],
	limit: ValidInteger,
} ) => {

}
