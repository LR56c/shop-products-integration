import { Errors } from '../../shared/domain/exceptions/errors'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import {
	CartProductResponse
} from '../domain/cart_response'
import { CartRepository } from '../domain/cart_repository'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Email } from '../../shared/domain/value_objects/email'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'

export const GetCartByUserEmail = async (
	repo: CartRepository,
	props: {
		email: string
	} ): Promise<CartProductResponse[] | Errors> => {

	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( props.email ) )

	if ( emailResult instanceof BaseException ) {
		return new Errors( [ new EmailException( 'email' ) ])
	}

	return await wrapTypeErrors(()=>repo.getByUserEmail( emailResult as Email ))
}
