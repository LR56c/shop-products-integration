import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { CartRepository } from '../domain/cart_repository'

export const DeleteCart = async (
	repo: CartRepository,
	email: string,
	product_id: string
): Promise<boolean | Errors> => {
	const errors: BaseException[] = []

	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( email )
	)

	if ( emailResult instanceof BaseException ) {
		errors.push( new EmailException( 'email' ) )
	}

	const product_idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( product_id )
	)

	if ( product_idResult instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'product_id' ) )
	}

	return await wrapTypeErrors(
		() => repo.remove( emailResult as Email, product_idResult as UUID ) )
}
