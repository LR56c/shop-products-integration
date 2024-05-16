import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { GetProduct } from '~features/products/application/get_product'
import { UpdateProduct } from '~features/products/application/update_product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { DiscountCreatedEvent } from '~features/shared/domain/events/discount_created_event'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class ApplyDiscountProductService {
	constructor( private readonly repo: ProductRepository ) {}

	@OnEvent( DiscountCreatedEvent.tag )
	async handleEvent( payload: DiscountCreatedEvent ) {
		try {
			const product = await GetProduct( this.repo, payload.product_id )


			await UpdateProduct( this.repo, UUID.from(payload.product_id), product, {
				discount: payload.discount_id
			})

			console.log(
				`success updated discount to product id: ${ payload.product_id }` )
		}
		catch ( e ) {
			console.log(
				`failed updated discount to product id: ${ payload.product_id }` )
			console.log( e )
		}
	}

}
