import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { Email } from '../../shared/domain/value_objects/email'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { CartRepository } from '../domain/cart_repository'
import { CartProductResponse } from '../domain/cart_response'

export const GetCartByUserEmail = async (
	repo: CartRepository,
	props: {
		email: string
	} ): Promise<CartProductResponse[] | Errors> => {

	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( props.email ) )

	if ( emailResult instanceof BaseException ) {
		return new Errors( [ new EmailException( 'email' ) ] )
	}

	return await wrapTypeErrors(
		() => repo.getByUserEmail( emailResult as Email ) )
}
