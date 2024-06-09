import { ItemConfirmed } from 'packages/item_confirmed/domain/item_confirmed'
import { OrderConfirmed } from 'packages/order_confirmed/domain/order_confirmed'
import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { EmailException } from 'packages/shared/domain/exceptions/EmailException'
import { InvalidDateException } from 'packages/shared/domain/exceptions/InvalidDateException'
import { InvalidUUIDException } from 'packages/shared/domain/exceptions/InvalidUUIDException'
import { Email } from 'packages/shared/domain/value_objects/email'
import { UUID } from 'packages/shared/domain/value_objects/uuid'
import { ValidDate } from 'packages/shared/domain/value_objects/valid_date'
import { wrapType } from 'packages/shared/utils/wrap_type'
import { ItemConfirmedDto } from './item_confirmed_dto'

export function parseItemConfirmed( dto: ItemConfirmedDto ): ItemConfirmed | BaseException[]
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

	let shopkeeperResult: Email | undefined = undefined
	if ( dto.shop_keeper_email !== undefined ) {
		const shopkeeper_email = wrapType<Email, EmailException>(
			() => Email.from( dto.shop_keeper_email! ) )
		if ( shopkeeper_email instanceof BaseException ) {
			errors.push( shopkeeper_email )
		}
		else {
			shopkeeperResult = shopkeeper_email
		}
	}

	if ( errors.length > 0 ) {
		return errors
	}

	return new OrderConfirmed(
		idResult as UUID,
		creationDateResult as ValidDate,
		shopkeeperResult
	)
}
