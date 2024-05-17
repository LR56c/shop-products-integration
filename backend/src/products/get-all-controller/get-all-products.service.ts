import { Injectable } from '@nestjs/common'
import { GetAllProducts } from '~features/products/application/get_all_products'
import { ProductResponse } from '~features/products/domain/models/product_response'
import { ProductRepository } from '~features/products/domain/repository/product_repository'

@Injectable()
export class GetAllProductsService {
	constructor( private repository: ProductRepository ) {}

	async getAll( from: number, to: number,
		name ?: string ): Promise<ProductResponse[]> {
		return GetAllProducts( this.repository, { from, to, name } )
	}
}
