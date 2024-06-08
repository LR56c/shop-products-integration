import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Email } from '../../shared/domain/value_objects/Email'
import { wrapType } from '../../shared/utils/WrapType'
import { CartRepository } from '../domain/cart_repository'
import { CartProductResponse } from '../domain/cart_response'

export const GetCartByUserEmail = async (
	repo: CartRepository,
	props: {
		email: string
	} ): Promise<CartProductResponse[]> => {

	const errors: BaseException[] = []

	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( props.email ) )

	if ( emailResult instanceof BaseException ) {
		errors.push( new EmailException() )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return repo.getByUserEmail( emailResult as Email )
}
