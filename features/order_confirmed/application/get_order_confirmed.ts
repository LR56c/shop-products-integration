import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { wrapType } from '../../shared/utils/WrapType'
import { OrderConfirmed } from '../domain/order_confirmed'
import { OrderConfirmedRepository } from '../domain/order_confirmed_repository'

export const GetOrderConfirmed = async (
	repo: OrderConfirmedRepository,
	id: string ): Promise<OrderConfirmed> => {

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		throw [ new InvalidUUIDException( 'id' ) ]
	}

	return repo.get( idResult )

}
