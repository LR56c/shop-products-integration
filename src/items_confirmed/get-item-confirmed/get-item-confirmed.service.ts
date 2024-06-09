import { Injectable } from '@nestjs/common'
import { ItemConfirmed } from 'packages/item_confirmed/domain/item_confirmed'
import { ItemConfirmedRepository } from 'packages/item_confirmed/domain/item_confirmed_repository'
import { UUID } from 'packages/shared/domain/value_objects/uuid'

@Injectable()
export class GetItemConfirmedService {
	constructor( private readonly repo: ItemConfirmedRepository ) {}

	async execute( id: UUID ): Promise<ItemConfirmed> {
		return this.repo.get( id )
	}
}
