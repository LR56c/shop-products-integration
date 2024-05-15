import { OrderRepository } from 'features/orders/domain/order_repository'
import { BaseException } from 'features/shared/domain/exceptions/BaseException'
import { wrapType } from 'features/shared/utils/WrapType'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'

export const DeleteOrder = async ( repo: OrderRepository,
	id: string ): Promise<boolean> => {

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		throw [ new InvalidUUIDException( 'id' ) ]
	}

	return repo.deleteOrder( idResult )
}
