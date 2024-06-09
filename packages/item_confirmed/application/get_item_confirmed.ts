import { ItemConfirmed } from 'packages/item_confirmed/domain/item_confirmed'
import { ItemConfirmedRepository } from 'packages/item_confirmed/domain/item_confirmed_repository'
import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { Errors } from 'packages/shared/domain/exceptions/errors'
import { UUID } from 'packages/shared/domain/value_objects/uuid'
import {
	wrapType,
	wrapTypeErrors
} from 'packages/shared/utils/wrap_type'

export const GetItemConfirmed = async ( repo: ItemConfirmedRepository, id : string): Promise<ItemConfirmed | Errors>=>{
	const idResult = wrapType(()=> UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		return new Errors( [ idResult ] )
	}

	return await wrapTypeErrors(()=> repo.get(idResult) )
}
