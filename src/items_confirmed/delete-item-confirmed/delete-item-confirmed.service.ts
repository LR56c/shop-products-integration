import { Injectable } from '@nestjs/common'
import { ItemConfirmedRepository } from 'packages/item_confirmed/domain/item_confirmed_repository'
import { UUID } from 'packages/shared/domain/value_objects/uuid'

@Injectable()
export class DeleteItemConfirmedService {
	constructor( private readonly repo: ItemConfirmedRepository ) {}

	async execute( id: UUID ): Promise<boolean> {
		return this.repo.delete( id )
	}
}
