import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Email } from '../../shared/domain/value_objects/Email'
import { wrapType } from '../../shared/utils/WrapType'
import { CartRepository } from '../domain/cart_repository'

export const DeleteAllCart = async (
	repo: CartRepository,
	email: string
): Promise<boolean> => {
	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( email )
	)

	if ( emailResult instanceof BaseException ) {
		throw [ new EmailException( 'email' ) ]
	}

	return repo.removeAll( emailResult )
}
