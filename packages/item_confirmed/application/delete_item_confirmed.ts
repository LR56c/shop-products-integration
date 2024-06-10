import { ItemConfirmedRepository } from '../domain/item_confirmed_repository'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { UUID } from '../../shared/domain/value_objects/uuid'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'

export const DeleteItemConfirmed = async ( repo: ItemConfirmedRepository, id: string): Promise<boolean | Errors>=>{

	const idResult = wrapType(()=> UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		return new Errors( [ idResult ] )
	}

	return await wrapTypeErrors(()=> repo.delete(idResult) )
}
