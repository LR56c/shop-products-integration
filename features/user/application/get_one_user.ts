import { UserDao } from '../domain/dao/UserDao'
import { User } from '../domain/models/User'
import { Email } from '../../shared/domain/value_objects/Email'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { wrapType } from '../../shared/utils/WrapType'

export const GetOneUser = async (
	repo: UserDao,
	email: string ): Promise<User> => {

	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( email ) )

	if ( emailResult instanceof EmailException ) {
		throw [ new EmailException( 'email' ) ]
	}

	return repo.getOneUser( emailResult as Email )
}
