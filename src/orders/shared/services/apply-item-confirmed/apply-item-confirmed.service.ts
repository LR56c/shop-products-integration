import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { GetOrder } from '../../../../../packages/orders/application/get_order'
import { UpdateOrder } from '../../../../../packages/orders/application/update_order'
import { OrderRepository } from '../../../../../packages/orders/domain/order_repository'
import { ItemConfirmedEvent } from '../../../../../packages/shared/domain/events/item_confirmed_event'
import { Errors } from '../../../../../packages/shared/domain/exceptions/errors'

@Injectable()
export class ApplyItemConfirmedService {
	constructor( private readonly repo: OrderRepository ) {}

	@OnEvent( ItemConfirmedEvent.tag )
	async handleEvent( payload: ItemConfirmedEvent ) {
		try {
			const order = await GetOrder( this.repo, payload.order_id.value )

			if( order instanceof Errors ) {
				throw [...order.values]
			}

			await UpdateOrder( this.repo, payload.order_id, order, {
				order_confirmed_id: payload.item_confirmed_id.value
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
