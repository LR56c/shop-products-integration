import { Injectable } from '@nestjs/common'
import { GetProduct } from '~features/products/application/get_product'
import { UpdateProduct } from '~features/products/application/update_product'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { Errors } from '~features/shared/domain/exceptions/errors'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/uuid'
import { wrapType } from '~features/shared/utils/wrap_type'
import { PartialProductDto } from '../shared/dto/partial_product_dto'
import { ProductRepository } from '~features/products/domain/repository/product_repository'

@Injectable()
export class UpdateProductService {
	constructor( private repository: ProductRepository ) {
	}

	async updateProduct( id: string,
		product: PartialProductDto ): Promise<boolean> {

		const idResult = wrapType<UUID, InvalidUUIDException>(
			() => UUID.from( id ) )

		if ( idResult instanceof BaseException ) {
			throw [ new InvalidUUIDException( 'id' ) ]
		}

		const productSaved = await GetProduct( this.repository, id )

		if ( productSaved instanceof Errors ) {
			throw [...productSaved.values]
		}

		const result = await UpdateProduct( this.repository, idResult as UUID, productSaved, {
			code         : product.code,
			product_code : product.product_code,
			name         : product.name,
			description  : product.description,
			brand        : product.brand,
			price        : product.price,
			image_url    : product.image_url,
			stock        : product.stock,
			average_rank : product.average_rank,
			category_name: product.category,
			discount     : product.discount
		} )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}
		return result
	}
}
