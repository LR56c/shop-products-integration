import { DiscountRepository } from '../domain/discount_repository'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { wrapType } from '../../shared/utils/WrapType'

export const RemoveDiscount = async ( repo: DiscountRepository,
	id: string ): Promise<boolean> => {

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		throw [ new InvalidUUIDException( 'id' ) ]
	}

	return repo.remove( idResult)
}
