import { Injectable } from '@nestjs/common'
import { GetProduct } from '../../../packages/products/application/get_product'
import { ProductResponse } from '../../../packages/products/domain/models/product_response'
import { ProductRepository } from '../../../packages/products/domain/repository/product_repository'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'

@Injectable()
export class GetProductService {
	constructor( private repository: ProductRepository ) {
	}

	async getProduct( id: string ): Promise<ProductResponse> {
		const result = await GetProduct( this.repository, id )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}
		return result
	}
}
