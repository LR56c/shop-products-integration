import { Errors } from '../../shared/domain/exceptions/errors'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { OrderConfirmed } from '../domain/order_confirmed'
import { OrderConfirmedRepository } from '../domain/order_confirmed_repository'

export const CreateOrderConfirmed = async (
	repo: OrderConfirmedRepository,
	props: {
		id: string,
		creation_date: Date,
		accountant_email?: string
	} ): Promise<boolean | Errors> => {

	const errors: BaseException[] = []

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( props.id ) )

	if ( idResult instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'id' ) )
	}

	const creation_dateResult = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( props.creation_date ) )

	if ( creation_dateResult instanceof BaseException ) {
		errors.push( new InvalidDateException( 'creation_date' ) )
	}

	const emailResult = props.accountant_email === undefined
		? undefined
		: wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( props.accountant_email ?? '' ) )

	if ( emailResult != undefined && emailResult instanceof
		BaseException )
	{
		errors.push( new InvalidStringException( 'name' ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	const orderConfirmed = new OrderConfirmed(
		idResult as UUID,
		creation_dateResult as ValidDate,
		emailResult as Email
	)

	return await wrapTypeErrors(()=>repo.create( orderConfirmed ))
}
