import { Auth } from '../domain/auth'
import { AuthRepository } from '../domain/auth_repository'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { Email } from '../../shared/domain/value_objects/email'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { Password } from '../../user/domain/models/Password'

export const LoginAuth = async (
	repo: AuthRepository,
	email: string,
	password: string
): Promise<Auth | Errors> => {
	const errors: BaseException[] = []

	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( email )
	)

	if ( emailResult instanceof BaseException ) {
		errors.push( new EmailException( 'email' ) )
	}

	const passwordResult = await wrapTypeErrors(()=>Password.from( password ) )

	if ( passwordResult instanceof Errors ) {
		errors.push( ...passwordResult.values )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	return await wrapTypeErrors(()=>repo.login(
		emailResult as Email,
		passwordResult as Password
	))
}
