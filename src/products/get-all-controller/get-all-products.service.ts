import { Injectable } from '@nestjs/common'
import { GetAllProducts } from 'packages/products/application/get_all_products'
import { ProductResponse } from 'packages/products/domain/models/product_response'
import { ProductRepository } from 'packages/products/domain/repository/product_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class GetAllProductsService {
	constructor( private repository: ProductRepository ) {}

	async getAll( from: number, to: number,
		name ?: string ): Promise<ProductResponse[]> {
		const result =  await GetAllProducts( this.repository, { from, to, name } )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
