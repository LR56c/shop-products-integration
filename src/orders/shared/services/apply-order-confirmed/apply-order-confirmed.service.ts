import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { GetOrder } from 'packages/orders/application/get_order'
import { UpdateOrder } from 'packages/orders/application/update_order'
import { OrderRepository } from 'packages/orders/domain/order_repository'
import { OrderConfirmedEvent } from 'packages/shared/domain/events/order_confirmed_event'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class ApplyOrderConfirmedService {
	constructor( private readonly repo: OrderRepository ) {}

	@OnEvent( OrderConfirmedEvent.tag )
	async handleEvent( payload: OrderConfirmedEvent ) {
		try {
			const order = await GetOrder( this.repo, payload.order_id.value )

			if( order instanceof Errors ) {
				throw [...order.values]
			}

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
