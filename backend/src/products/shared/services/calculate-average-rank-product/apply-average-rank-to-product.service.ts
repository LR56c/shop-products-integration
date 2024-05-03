import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Product } from '~features/products/domain/models/product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { ProductRankUpdateEvent } from '~features/shared/domain/events/product_rank_update_event'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { ValidRank } from '~features/shared/domain/value_objects/ValidRank'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'

@Injectable()
export class ApplyAverageRankToProductService {

	constructor( private repository: ProductRepository ) {
	}

	@OnEvent( ProductRankUpdateEvent.tag )
	async handleEvent( payload: ProductRankUpdateEvent ) {
		try {
			const code = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( payload.code ) )

			if ( code instanceof InvalidStringException ) {
				throw code
			}

			const productResult = await this.repository.getProduct(
				code as ValidString )

			const newProduct = new Product(
				productResult.id,
				productResult.code,
				productResult.product_code,
				productResult.name,
				productResult.description,
				productResult.created_at,
				productResult.brand,
				productResult.price,
				productResult.image_url,
				productResult.stock,
				ValidRank.from( payload.rank ),
				productResult.category_name
			)

			await this.repository.updateProduct( newProduct )

			console.log( `success updated average rank of product ${ payload.code }` )
		}
		catch ( e ) {
			console.log( `failed updated average rank of product ${ payload.code }` )
			console.log( e )
		}
	}
}
