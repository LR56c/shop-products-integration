import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { UpdateOrder } from '~features/orders/application/update_order'
import {
	PartialOrder,
	PartialOrderProduct
} from '~features/orders/domain/order'
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
				order.products.map( ( op ) => ( new PartialOrderProduct(
					op.quantity,
					op.product.id
				))),
				order.seller_email,
				order.order_confirmed?.id,
				order.item_confirmed?.id
			)

			await UpdateOrder( this.repo, payload.order_id, o, {
				order_confirmed_id: payload.item_confirmed_id.value,
			} )

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
