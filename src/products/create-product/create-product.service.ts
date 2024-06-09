import { Injectable } from '@nestjs/common'
import { CreateProduct } from 'packages/products/application/create_product'
import { ProductRepository } from 'packages/products/domain/repository/product_repository'
import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { CreateProductDto } from '../shared/dto/create_product_dto'

@Injectable()
export class CreateProductService {
	constructor( private repository: ProductRepository ) {}

	async createProduct( props: CreateProductDto ): Promise<boolean> {
		const result = await CreateProduct( this.repository, {
			id           : props.id,
			code         : props.code,
			product_code : props.product_code,
			name         : props.name,
			description  : props.description,
			brand        : props.brand,
			image_url    : props.image_url,
			price        : props.price,
			stock        : props.stock,
			category_name: props.category
		} )

		if ( result instanceof BaseException ) {
			throw [result]
		}
		return true
	}
}
