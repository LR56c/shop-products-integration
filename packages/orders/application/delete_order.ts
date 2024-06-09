import { OrderRepository } from '../domain/order_repository'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { wrapType } from '../../shared/utils/wrap_type'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/uuid'

export const DeleteOrder = async ( repo: OrderRepository,
	id: string ): Promise<boolean> => {

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		throw [ new InvalidUUIDException( 'id' ) ]
	}

	return repo.deleteOrder( idResult )
}
