import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import {
	PartialOrder
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
				order.products.map( ( id ) => id.id ),
				order.seller_email,
				payload.confirmed_id,
				order.item_confirmed?.id
			)

			await this.repo.updateOrder( payload.order_id, o )

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
