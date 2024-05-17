import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { GetOrder } from '~features/orders/application/get_order'
import { UpdateOrder } from '~features/orders/application/update_order'
import { OrderRepository } from '~features/orders/domain/order_repository'
import { OrderConfirmedEvent } from '~features/shared/domain/events/order_confirmed_event'

@Injectable()
export class ApplyOrderConfirmedService {
	constructor( private readonly repo: OrderRepository ) {}

	@OnEvent( OrderConfirmedEvent.tag )
	async handleEvent( payload: OrderConfirmedEvent ) {
		try {
			const order = await GetOrder( this.repo, payload.order_id.value )

			await UpdateOrder( this.repo, payload.order_id, order, {
				item_confirmed_id: payload.confirmed_id.value
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
