import { ItemConfirmed } from '../domain/item_confirmed'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from 'features/shared/domain/exceptions/EmailException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { wrapType } from '../../shared/utils/WrapType'

export function itemConfirmedToJson( itemConfirmed: ItemConfirmed ): Record<string, any> {
	return {
		id               : itemConfirmed.id.value,
		creation_date    : itemConfirmed.creation_date.value,
		shop_keeper_email: itemConfirmed.shop_keeper_email?.value
	}
}

export function itemConfirmedFromJson( json: Record<string, any> ): ItemConfirmed | BaseException[] {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	const creation_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.creation_date ) )

	if ( creation_date instanceof BaseException ) {
		errors.push( new InvalidDateException( 'created_at' ) )
	}

	const shop_keeper_email = wrapType<Email, EmailException>(
		() => Email.from( json.shop_keeper_email ) )

	return new ItemConfirmed(
		id as UUID,
		creation_date as ValidDate,
		shop_keeper_email instanceof BaseException ? undefined : shop_keeper_email
	)
}
