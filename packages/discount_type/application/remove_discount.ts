import { Errors } from '../../shared/domain/exceptions/errors'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/uuid'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { DiscountRepository } from '../domain/discount_repository'

export const RemoveDiscount = async ( repo: DiscountRepository,
	id: string ): Promise<boolean | Errors> => {

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		return new Errors( [ idResult ] )
	}

	return await wrapTypeErrors( () => repo.remove( idResult ) )
}
