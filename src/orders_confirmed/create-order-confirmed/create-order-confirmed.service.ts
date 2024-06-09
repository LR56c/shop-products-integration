import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CreateOrderConfirmed } from 'packages/order_confirmed/application/create_order_confirmed'
import { OrderConfirmedRepository } from 'packages/order_confirmed/domain/order_confirmed_repository'
import { OrderConfirmedEvent } from 'packages/shared/domain/events/order_confirmed_event'
import { Errors } from 'packages/shared/domain/exceptions/errors'
import { OrderConfirmedDto } from '../shared/order_confirmed_dto'

@Injectable()
export class CreateOrderConfirmedService {
	constructor( private readonly repo: OrderConfirmedRepository,
		private eventEmitter: EventEmitter2 )
	{}

	async execute( order_id: string,
		orderConfirmed: OrderConfirmedDto ): Promise<boolean> {

		const result = await CreateOrderConfirmed( this.repo, {
			id              : orderConfirmed.id,
			creation_date   : orderConfirmed.creation_date,
			accountant_email: orderConfirmed.accountant_email
		} )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		this.eventEmitter.emit( OrderConfirmedEvent.tag, {
			order_id    : order_id,
			confirmed_id: orderConfirmed.id
		} )

		return result
	}
}
