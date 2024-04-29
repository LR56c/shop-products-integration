import { Product } from '../domain/models/product'
import { ProductRepository } from '../domain/repository/product_repository'

export const UpdateProduct = async ( repo: ProductRepository, product: Product): Promise<boolean> => {
	return await repo.updateProduct(product )
}
