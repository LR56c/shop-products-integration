import { ItemConfirmed } from '~features/item_confirmed/domain/item_confirmed'
import { OrderConfirmed } from '~features/order_confirmed/domain/order_confirmed'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { InvalidDateException } from '~features/shared/domain/exceptions/InvalidDateException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { ValidDate } from '~features/shared/domain/value_objects/ValidDate'
import { wrapType } from '~features/shared/utils/WrapType'
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
