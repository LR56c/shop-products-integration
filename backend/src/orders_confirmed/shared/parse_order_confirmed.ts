import { OrderConfirmedDto } from './order_confirmed_dto'
import { OrderConfirmed } from '~features/order_confirmed/domain/order_confirmed'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { InvalidDateException } from '~features/shared/domain/exceptions/InvalidDateException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { ValidDate } from '~features/shared/domain/value_objects/ValidDate'
import { wrapType } from '~features/shared/utils/WrapType'

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
