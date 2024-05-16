import { Injectable } from '@nestjs/common'
import { CreateProductDto } from '../shared/dto/create_product_dto'
import { CreateProduct } from '~features/products/application/create_product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'

@Injectable()
export class CreateProductService {
	constructor( private repository: ProductRepository ) {}

	async createProduct( props : CreateProductDto): Promise<boolean> {
		return CreateProduct( this.repository, {
			id          : props.id,
			code        : props.code,
			product_code: props.product_code,
			name        : props.name,
			description : props.description,
			brand       : props.brand,
			image_url   : props.image_url,
			price       : props.price,
			stock       : props.stock,
			category_name: props.category
		})
	}
}
