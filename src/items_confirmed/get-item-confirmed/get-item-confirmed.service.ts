import { Injectable } from '@nestjs/common'
import { GetItemConfirmed } from 'packages/item_confirmed/application/get_item_confirmed'
import { ItemConfirmed } from 'packages/item_confirmed/domain/item_confirmed'
import { ItemConfirmedRepository } from 'packages/item_confirmed/domain/item_confirmed_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class GetItemConfirmedService {
	constructor( private readonly repo: ItemConfirmedRepository ) {}

	async execute( id: string ): Promise<ItemConfirmed> {
		const result = await GetItemConfirmed( this.repo, id )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
