import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { GetOrder } from '~features/orders/application/get_order'
import { UpdateOrder } from '~features/orders/application/update_order'
import { OrderRepository } from '~features/orders/domain/order_repository'
import { ItemConfirmedEvent } from '~features/shared/domain/events/item_confirmed_event'

@Injectable()
export class ApplyItemConfirmedService {
	constructor( private readonly repo: OrderRepository ) {}

	@OnEvent( ItemConfirmedEvent.tag )
	async handleEvent( payload: ItemConfirmedEvent ) {
		try {
			const order = await GetOrder( this.repo, payload.order_id.value )

			await UpdateOrder( this.repo, payload.order_id, order, {
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
