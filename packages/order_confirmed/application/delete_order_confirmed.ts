import { Errors } from '../../shared/domain/exceptions/errors'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/uuid'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { OrderConfirmedRepository } from '../domain/order_confirmed_repository'

export const DeleteOrderConfirmed = async (
	repo: OrderConfirmedRepository,
	id: string ): Promise<boolean | Errors> => {

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		return new Errors( [ idResult ])
	}

	return await wrapTypeErrors(()=>repo.delete( idResult ))

}
