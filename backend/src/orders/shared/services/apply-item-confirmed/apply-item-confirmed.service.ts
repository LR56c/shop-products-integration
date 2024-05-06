import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { PartialOrder } from '~features/orders/domain/order'
import { OrderRepository } from '~features/orders/domain/order_repository'
import { ItemConfirmedEvent } from '~features/shared/domain/events/item_confirmed_event'

@Injectable()
export class ApplyItemConfirmedService {
	constructor( private readonly repo: OrderRepository ) {}

	@OnEvent( ItemConfirmedEvent.tag )
	async handleEvent( payload: ItemConfirmedEvent ) {
		try {
			const order = await this.repo.getOrder( payload.order_id )

			const o = new PartialOrder(
				order.client_email,
				order.payment.id,
				order.products.map( ( id ) => id.id ),
				order.seller_email,
				order.order_confirmed?.id,
				payload.confirmed_id
			)

			await this.repo.updateOrder( payload.order_id, o )

			console.log(
				`success updated item confirmed to order id: ${ payload.order_id.value }` )
		}
		catch ( e ) {
			console.log(
				`failed updated item confirmed to order id: ${ payload.order_id.value }` )
			console.log( e )
		}
	}
}
