import { ProductResponse } from '../models/product_response'
import { UUID } from '../../../shared/domain/value_objects/UUID'
import { ValidRank } from '../../../shared/domain/value_objects/ValidRank'
import { ValidInteger } from '../../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'
import { Product } from '../models/product'

export abstract class ProductRepository {
	abstract createProduct( product: Product ): Promise<boolean>

	abstract deleteProduct( id : UUID ): Promise<boolean>

	abstract getAll( from: ValidInteger, to: ValidInteger,
		name ?: ValidString ): Promise<ProductResponse[]>

	abstract getProduct( id : UUID ): Promise<ProductResponse>

	abstract getProductsByRankThreshold( threshold: ValidRank, limit: ValidInteger ): Promise<ProductResponse[]>

	abstract updateProduct(id: UUID, product: Product ): Promise<boolean>
}
