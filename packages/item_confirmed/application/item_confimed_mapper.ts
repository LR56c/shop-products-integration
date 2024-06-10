import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { wrapType } from '../../shared/utils/wrap_type'
import { ItemConfirmed } from '../domain/item_confirmed'

export function itemConfirmedToJson( itemConfirmed: ItemConfirmed ): Record<string, any> {
	return {
		id               : itemConfirmed.id.value,
		creation_date    : itemConfirmed.creation_date.value,
		shop_keeper_email: itemConfirmed.shop_keeper_email
			? itemConfirmed.shop_keeper_email.value
			: 'null'
	}
}

export function itemConfirmedFromJson( json: Record<string, any> ): ItemConfirmed | Errors {
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

	const shop_keeper_email = wrapType<Email, EmailException>(
		() => Email.from( json.shop_keeper_email ) )

	if ( shop_keeper_email instanceof BaseException ) {
		errors.push( new EmailException( 'shop_keeper_email' ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors)
	}

	return new ItemConfirmed(
		id as UUID,
		creation_date as ValidDate,
		shop_keeper_email instanceof BaseException ? undefined : shop_keeper_email
	)
}
