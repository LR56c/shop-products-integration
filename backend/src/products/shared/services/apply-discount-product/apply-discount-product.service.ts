import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { Product } from '~features/products/domain/models/product'
import { ProductRepository } from '~features/products/domain/repository/product_repository'
import { DiscountCreatedEvent } from '~features/shared/domain/events/discount_created_event'

@Injectable()
export class ApplyDiscountProductService {
	constructor( private readonly repo: ProductRepository ) {}

	@OnEvent( DiscountCreatedEvent.tag )
	async handleEvent( payload: DiscountCreatedEvent ) {
		try {
			const product = await this.repo.getProduct( payload.product_id )

			const newProduct = new Product(
				product.id,
				product.code,
				product.product_code,
				product.name,
				product.description,
				product.created_at,
				product.brand,
				product.price,
				product.image_url,
				product.stock,
				product.average_rank,
				product.category_name,
				payload.discount
			)

			await this.repo.updateProduct( newProduct.id, newProduct )

			console.log(
				`success updated discount to product id: ${ payload.product_id.value }` )
		}
		catch ( e ) {
			console.log(
				`failed updated discount to product id: ${ payload.product_id.value }` )
			console.log( e )
		}
	}

}
