import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { Email } from '../../shared/domain/value_objects/email'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { CartRepository } from '../domain/cart_repository'

export const DeleteAllCart = async (
	repo: CartRepository,
	email: string
): Promise<boolean | Errors> => {
	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( email )
	)

	if ( emailResult instanceof BaseException ) {
		return new Errors( [ emailResult ] )
	}

	return await wrapTypeErrors( () => repo.removeAll( emailResult ) )
}
