import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { GetProductByCode } from '~features/products/application/get_product_by_code'
import { UpdateProduct } from '~features/products/application/update_product'
import { Product } from '~features/products/domain/models/product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { ProductRankUpdateEvent } from '~features/shared/domain/events/product_rank_update_event'
import { ValidRank } from '~features/shared/domain/value_objects/ValidRank'

@Injectable()
export class ApplyAverageRankToProductService {

	constructor( private repository: ProductRepository ) {
	}

	@OnEvent( ProductRankUpdateEvent.tag )
	async handleEvent( payload: ProductRankUpdateEvent ) {
		try {
			const productResult = await GetProductByCode( this.repository,
				{ code: payload.code } )


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
				ValidRank.from( payload.rank.toString()),
				productResult.category_name
			)

			await UpdateProduct( this.repository, newProduct )

			console.log( `success updated average rank of product ${ payload.code }` )
		}
		catch ( e ) {
			console.log( `failed updated average rank of product ${ payload.code }` )
			console.log( e )
		}
	}
}
