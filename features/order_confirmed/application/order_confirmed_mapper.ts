import { OrderConfirmed } from '../domain/order_confirmed'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { wrapType } from '../../shared/utils/WrapType'

export function orderConfirmedToJson( orderConfirmed: OrderConfirmed ): Record<string, any> {
	return {
		id              : orderConfirmed.id.value,
		created_at   : orderConfirmed.creation_date.value,
		accountant_email: orderConfirmed.accountant_email?.value
	}
}

export function orderConfirmedFromJson( json: Record<string, any> ): OrderConfirmed | BaseException[] {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	const creation_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.created_at ) )

	if ( creation_date instanceof BaseException ) {
		errors.push( new InvalidDateException( 'created_at' ) )
	}

	const accountant_email = wrapType<Email, EmailException>(
		() => Email.from( json.accountant_email ) )

	return new OrderConfirmed(
		id as UUID,
		creation_date as ValidDate,
		accountant_email instanceof BaseException ? undefined : accountant_email
	)
}
