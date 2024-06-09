import { Injectable } from '@nestjs/common'
import { GetAllItemConfirmed } from 'packages/item_confirmed/application/get_all_item_confirmed'
import { ItemConfirmed } from 'packages/item_confirmed/domain/item_confirmed'
import { ItemConfirmedRepository } from 'packages/item_confirmed/domain/item_confirmed_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class GetAllItemConfirmedService {
	constructor( private readonly repo: ItemConfirmedRepository ) {}

	async execute( from: number,
		to: number ): Promise<ItemConfirmed[]> {
		const result = await GetAllItemConfirmed( this.repo, {
			from,
			to
		} )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
