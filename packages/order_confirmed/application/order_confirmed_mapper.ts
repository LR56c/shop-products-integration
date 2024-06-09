import { Errors } from 'packages/shared/domain/exceptions/errors'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { wrapType } from '../../shared/utils/wrap_type'
import { OrderConfirmed } from '../domain/order_confirmed'

export function orderConfirmedToJson( orderConfirmed: OrderConfirmed ): Record<string, any> {
	return {
		id              : orderConfirmed.id.value,
		created_at      : orderConfirmed.creation_date.value,
		accountant_email: orderConfirmed.accountant_email?.value
	}
}

export function orderConfirmedFromJson( json: Record<string, any> ): OrderConfirmed | Errors {
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

	if ( accountant_email instanceof BaseException ) {
		errors.push( new EmailException( 'accountant_email' ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors)
	}

	return new OrderConfirmed(
		id as UUID,
		creation_date as ValidDate,
		accountant_email instanceof BaseException ? undefined : accountant_email
	)
}
