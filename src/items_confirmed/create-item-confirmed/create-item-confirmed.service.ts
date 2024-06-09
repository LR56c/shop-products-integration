import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { ItemConfirmed } from 'packages/item_confirmed/domain/item_confirmed'
import { ItemConfirmedRepository } from 'packages/item_confirmed/domain/item_confirmed_repository'
import { ItemConfirmedEvent } from 'packages/shared/domain/events/item_confirmed_event'
import { UUID } from 'packages/shared/domain/value_objects/uuid'

@Injectable()
export class CreateItemConfirmedService {
	constructor( private readonly repo: ItemConfirmedRepository,
		private eventEmitter: EventEmitter2 )
	{}

	async execute( id: UUID, order: ItemConfirmed ): Promise<boolean> {
		this.eventEmitter.emit( ItemConfirmedEvent.tag, {
			order_id    : id,
			confirmed_id: order.id
		} )

		return this.repo.create( order )
	}
}
