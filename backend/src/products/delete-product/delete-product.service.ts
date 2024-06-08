import { Injectable } from '@nestjs/common'
import { DeleteProduct } from '~features/products/application/delete_product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'

@Injectable()
export class DeleteProductService {
	constructor( private repository: ProductRepository ) {
	}

	async deleteProduct( id: string ): Promise<boolean> {
		const result =  await DeleteProduct( this.repository, id )

		if ( result instanceof BaseException ) {
			throw [result]
		}
		return true
	}
}
