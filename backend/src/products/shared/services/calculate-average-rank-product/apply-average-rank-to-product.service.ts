import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { GetProduct } from '~features/products/application/get_product'
import { UpdateProduct } from '~features/products/application/update_product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { ProductRankUpdateEvent } from '~features/shared/domain/events/product_rank_update_event'

@Injectable()
export class ApplyAverageRankToProductService {

	constructor( private repository: ProductRepository ) {
	}

	@OnEvent( ProductRankUpdateEvent.tag )
	async handleEvent( payload: ProductRankUpdateEvent ) {
		try {
			const productResult = await GetProduct( this.repository, payload.product_id.value)

			await UpdateProduct( this.repository, payload.product_id, productResult, {
				average_rank: payload.average_value.value
			})

			console.log(
				`success updated average rank of product ${ payload.product_id.value }` )
		}
		catch ( e ) {
			console.log(
				`failed updated average rank of product ${ payload.product_id.value }` )
			console.log( e )
		}
	}
}
