import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { OrderConfirmed } from '~features/order_confirmed/domain/order_confirmed'
import { OrderConfirmedRepository } from '~features/order_confirmed/domain/order_confirmed_repository'
import { OrderConfirmedEvent } from '~features/shared/domain/events/order_confirmed_event'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class CreateOrderConfirmedService {
	constructor( private readonly repo: OrderConfirmedRepository,
		private eventEmitter: EventEmitter2 )
	{}

	async execute( order_id: UUID,
		orderConfirmed: OrderConfirmed ): Promise<boolean> {

		this.eventEmitter.emit( OrderConfirmedEvent.tag, {
			order_id    : order_id,
			confirmed_id: orderConfirmed.id
		} )

		return this.repo.create( orderConfirmed )
	}
}
