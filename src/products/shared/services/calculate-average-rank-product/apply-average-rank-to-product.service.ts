import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { GetProduct } from 'packages/products/application/get_product'
import { UpdateProduct } from 'packages/products/application/update_product'
import { ProductRepository } from 'packages/products/domain/repository/product_repository'
import { ProductRankUpdateEvent } from 'packages/shared/domain/events/product_rank_update_event'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class ApplyAverageRankToProductService {

	constructor( private repository: ProductRepository ) {
	}

	@OnEvent( ProductRankUpdateEvent.tag )
	async handleEvent( payload: ProductRankUpdateEvent ) {
		try {
			const productResult = await GetProduct( this.repository,
				payload.product_id.value )

			if ( productResult instanceof Errors ) {
				throw [ ...productResult.values ]
			}

			const result = await UpdateProduct( this.repository, payload.product_id,
				productResult, {
					average_rank: payload.average_value.value
				} )

			if ( result instanceof Errors ) {
				throw [ ...result.values ]
			}

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
