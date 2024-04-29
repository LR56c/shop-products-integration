import { Injectable } from '@nestjs/common';
import { DeleteAllProduct } from '~features/products/application/delete_all_products'
import { ProductRepository } from '~features/products/domain/repository/product_repository'

@Injectable()
export class DeleteAllProductsService {
	constructor(private repo : ProductRepository,
) {}

	async deleteAll(): Promise<boolean> {
		return DeleteAllProduct(this.repo)
	}
}
