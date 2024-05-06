import { Injectable } from '@nestjs/common'
import { ItemConfirmed } from '~features/item_confirmed/domain/item_confirmed'
import { ItemConfirmedRepository } from '~features/item_confirmed/domain/item_confirmed_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class GetItemConfirmedService {
	constructor( private readonly repo: ItemConfirmedRepository ) {}

	async execute( id: UUID ): Promise<ItemConfirmed> {
		return this.repo.get( id )
	}
}
