import { UUID } from '../../../shared/domain/value_objects/UUID'
import { ValidRank } from '../../../shared/domain/value_objects/ValidRank'
import { ValidInteger } from '../../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'
import { Product } from '../models/Product'

export abstract class ProductRepository {
	abstract createProduct( product: Product ): Promise<boolean>

	abstract deleteProduct( id : UUID ): Promise<boolean>

	abstract getAll( from: ValidInteger, to: ValidInteger,
		name ?: ValidString ): Promise<Product[]>

	abstract getProduct( id : UUID ): Promise<Product>

	abstract getRecommendProductsGroupByCategory( threshold: ValidRank,
		products: Product[], limit: ValidInteger ): Promise<Map<string, Product[]>>

	abstract updateProduct(id: UUID, product: Product ): Promise<boolean>
}
