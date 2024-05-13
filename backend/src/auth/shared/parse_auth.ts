import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { wrapType } from '~features/shared/utils/WrapType'
import { Password } from '~features/user/domain/models/Password'

export function parseAuth( props: {
	email: string,
	password: string
} ): {
	email: Email,
	password: Password
}
{
	const errors: BaseException[] = []

	const email = wrapType<Email, EmailException>(
		() => Email.from( props.email ) )
	if ( email instanceof BaseException ) {
		errors.push( email )
	}

	const password = wrapType<Password, BaseException>(
		() => Password.from( props.password ) )

	if ( password instanceof BaseException ) {
		errors.push( password )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return {
		email   : email as Email,
		password: password as Password
	}
}
