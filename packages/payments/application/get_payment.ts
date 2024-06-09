import { Errors } from '../../shared/domain/exceptions/errors'
import { PaymentRepository } from '../domain/repository/payment_repository'
import { Payment } from '../domain/models/payment'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { BaseException } from '../../shared/domain/exceptions/BaseException'

export const GetPayment = async (
	repo: PaymentRepository,
	id: string ): Promise<Payment | Errors> => {

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		return new Errors( [ idResult ] )
	}

	return await wrapTypeErrors( () => repo.getPayment( idResult ) )
}
