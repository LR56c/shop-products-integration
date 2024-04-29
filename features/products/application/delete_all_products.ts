import { ProductRepository } from '../domain/repository/product_repository'

export const DeleteAllProduct = async ( repo: ProductRepository ): Promise<boolean> => {
	return await repo.deleteAll()
}
