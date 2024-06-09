import { OrderConfirmedDto } from './order_confirmed_dto'
import { OrderConfirmed } from 'packages/order_confirmed/domain/order_confirmed'
import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { EmailException } from 'packages/shared/domain/exceptions/EmailException'
import { InvalidDateException } from 'packages/shared/domain/exceptions/InvalidDateException'
import { InvalidUUIDException } from 'packages/shared/domain/exceptions/InvalidUUIDException'
import { Email } from 'packages/shared/domain/value_objects/email'
import { UUID } from 'packages/shared/domain/value_objects/uuid'
import { ValidDate } from 'packages/shared/domain/value_objects/valid_date'
import { wrapType } from 'packages/shared/utils/wrap_type'

export function parseOrderConfirmed( dto: OrderConfirmedDto ): OrderConfirmed | BaseException[]
{
	const errors: BaseException[] = []

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( dto.id ) )

	if ( idResult instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'id' ) )
	}

	const creationDateResult = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( dto.creation_date ) )

	if ( creationDateResult instanceof BaseException ) {
		errors.push( new InvalidDateException( 'creation_date' ) )
	}

	let accountantResult: Email | undefined = undefined
	if ( dto.accountant_email !== undefined ) {
		const accountant_email = wrapType<Email, EmailException>(
			() => Email.from( dto.accountant_email! ) )
		if ( accountant_email instanceof BaseException ) {
			errors.push( accountant_email )
		}
		else {
			accountantResult = accountant_email
		}
	}

	if ( errors.length > 0 ) {
		return errors
	}

	return new OrderConfirmed(
		idResult as UUID,
		creationDateResult as ValidDate,
		accountantResult
	)
}
