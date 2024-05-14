import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { UpdateOrder } from '~features/orders/application/update_order'
import {
	PartialOrder,
	PartialOrderProduct
} from '~features/orders/domain/order'
import { OrderRepository } from '~features/orders/domain/order_repository'
import { OrderConfirmedEvent } from '~features/shared/domain/events/order_confirmed_event'

@Injectable()
export class ApplyOrderConfirmedService {
	constructor( private readonly repo: OrderRepository ) {}

	@OnEvent( OrderConfirmedEvent.tag )
	async handleEvent( payload: OrderConfirmedEvent ) {
		try {
			const order = await this.repo.getOrder( payload.order_id )

			const o = new PartialOrder(
				order.client_email,
				order.payment.id,
				order.products.map( ( op ) => ( new PartialOrderProduct(
					op.quantity,
					op.product.id
				))),
				order.seller_email,
				order.order_confirmed?.id,
				order.item_confirmed?.id
			)

			await UpdateOrder( this.repo, payload.order_id, o, {
				item_confirmed_id: payload.confirmed_id.value,
			} )

			console.log(
				`success updated order confirmed to order id: ${ payload.order_id.value }` )
		}
		catch ( e ) {
			console.log(
				`failed updated order confirmed to order id: ${ payload.order_id.value }` )
			console.log( e )
		}
	}

}
