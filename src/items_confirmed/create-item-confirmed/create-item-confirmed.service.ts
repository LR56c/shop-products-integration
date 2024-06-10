import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CreateItemConfirmed } from '../../../packages/item_confirmed/application/create_item_confirmed'
import { ItemConfirmedRepository } from '../../../packages/item_confirmed/domain/item_confirmed_repository'
import { ItemConfirmedEvent } from '../../../packages/shared/domain/events/item_confirmed_event'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'
import { ItemConfirmedDto } from '../shared/item_confirmed_dto'

@Injectable()
export class CreateItemConfirmedService {
	constructor( private readonly repo: ItemConfirmedRepository,
		private eventEmitter: EventEmitter2 )
	{}

	async execute( dto: ItemConfirmedDto ): Promise<boolean> {
		const result = await CreateItemConfirmed( this.repo, {
			id               : dto.id,
			creation_date    : dto.creation_date,
			shop_keeper_email: dto.shop_keeper_email
		} )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		this.eventEmitter.emit( ItemConfirmedEvent.tag, {
			order_id    : dto.order_id,
			confirmed_id: dto.id
		} )

		return result
	}
}
