import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { Email } from '../../shared/domain/value_objects/email'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { UserDao } from '../domain/dao/UserDao'
import { User } from '../domain/models/User'

export const GetOneUser = async (
	repo: UserDao,
	email: string ): Promise<User | Errors> => {

	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( email ) )

	if ( emailResult instanceof EmailException ) {
		return new Errors( [ emailResult ] )
	}

	return wrapTypeErrors( () => repo.getOneUser( emailResult as Email ) )
}
