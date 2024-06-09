import { Errors } from '../../shared/domain/exceptions/errors'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Email } from '../../shared/domain/value_objects/email'
import { UserDao } from '../domain/dao/UserDao'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { BaseException } from '../../shared/domain/exceptions/BaseException'

export const DeleteUser = async (
	repo: UserDao,
	email: string ): Promise<boolean | Errors> => {

	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( email ) )

	if ( emailResult instanceof BaseException ) {
		return new Errors( [ emailResult ] )
	}

	return wrapTypeErrors(()=>repo.deleteUser( emailResult ))
}
