import { Injectable } from '@nestjs/common'
import { ItemConfirmed } from '~features/item_confirmed/domain/item_confirmed'
import { ItemConfirmedRepository } from '~features/item_confirmed/domain/item_confirmed_repository'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'

@Injectable()
export class GetAllItemConfirmedService {
	constructor( private readonly repo: ItemConfirmedRepository ) {}

	async execute( from: ValidInteger,
		to: ValidInteger ): Promise<ItemConfirmed[]> {
		return this.repo.getAll( from, to )
	}
}
