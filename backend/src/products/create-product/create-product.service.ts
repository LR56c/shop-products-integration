import { Injectable } from '@nestjs/common'
import { CreateProduct } from '~features/products/application/create_product'
import { PartialProductProps } from '~features/products/domain/models/product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'

@Injectable()
export class CreateProductService {
	constructor( private repository: ProductRepository ) {}

	async createProduct( props : PartialProductProps): Promise<boolean> {
		return CreateProduct( this.repository, props)
	}
}
