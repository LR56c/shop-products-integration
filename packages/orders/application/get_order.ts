import { Errors } from 'packages/shared/domain/exceptions/errors'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/uuid'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { OrderRepository } from '../domain/order_repository'
import { OrderResponse } from '../domain/order_response'

export const GetOrder = async ( repo: OrderRepository,
	id: string ): Promise<OrderResponse | Errors> => {

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		return new Errors( [ new InvalidUUIDException( 'id' ) ])
	}

	return await wrapTypeErrors(()=>repo.getOrder( idResult ))
}
