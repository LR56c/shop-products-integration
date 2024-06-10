import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { GetProduct } from '../../../../../packages/products/application/get_product'
import { UpdateProduct } from '../../../../../packages/products/application/update_product'
import { ProductRepository } from '../../../../../packages/products/domain/repository/product_repository'
import { DiscountCreatedEvent } from '../../../../../packages/shared/domain/events/discount_created_event'
import { Errors } from '../../../../../packages/shared/domain/exceptions/errors'
import { UUID } from '../../../../../packages/shared/domain/value_objects/uuid'

@Injectable()
export class ApplyDiscountProductService {
	constructor( private readonly repo: ProductRepository ) {}

	@OnEvent( DiscountCreatedEvent.tag )
	async handleEvent( payload: DiscountCreatedEvent ) {
		try {
			const product = await GetProduct( this.repo, payload.product_id )

			if ( product instanceof Errors ) {
				throw [ ...product.values ]
			}

			const result = await UpdateProduct( this.repo,
				UUID.from( payload.product_id ), product,
				{
					discount: payload.discount_id
				} )

			if ( result instanceof Errors ) {
				throw [ ...result.values ]
			}

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
