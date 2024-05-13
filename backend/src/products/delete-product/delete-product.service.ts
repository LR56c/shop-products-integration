import { Injectable } from '@nestjs/common'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class DeleteProductService {
	constructor( private repository: ProductRepository ) {
	}

	async deleteProduct( id: UUID ): Promise<boolean> {
		return this.repository.deleteProduct(id)
	}
}
