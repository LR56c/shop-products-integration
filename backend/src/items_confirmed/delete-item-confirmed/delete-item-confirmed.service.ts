import { Injectable } from '@nestjs/common'
import { ItemConfirmedRepository } from '~features/item_confirmed/domain/item_confirmed_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class DeleteItemConfirmedService {
	constructor( private readonly repo: ItemConfirmedRepository ) {}

	async execute( id: UUID ): Promise<boolean> {
		return this.repo.delete( id )
	}
}
