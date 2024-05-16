import { Injectable } from '@nestjs/common'
import { DeleteProduct } from '~features/products/application/delete_product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'

@Injectable()
export class DeleteProductService {
	constructor( private repository: ProductRepository ) {
	}

	async deleteProduct( id: string ): Promise<boolean> {
		return DeleteProduct( this.repository, id  )
	}
}
