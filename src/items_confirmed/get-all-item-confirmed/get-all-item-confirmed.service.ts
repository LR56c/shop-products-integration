import { Injectable } from '@nestjs/common'
import { ItemConfirmed } from 'packages/item_confirmed/domain/item_confirmed'
import { ItemConfirmedRepository } from 'packages/item_confirmed/domain/item_confirmed_repository'
import { ValidInteger } from 'packages/shared/domain/value_objects/valid_integer'

@Injectable()
export class GetAllItemConfirmedService {
	constructor( private readonly repo: ItemConfirmedRepository ) {}

	async execute( from: ValidInteger,
		to: ValidInteger ): Promise<ItemConfirmed[]> {
		return this.repo.getAll( from, to )
	}
}
