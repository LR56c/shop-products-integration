import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Email } from '../../shared/domain/value_objects/Email'
import { wrapType } from '../../shared/utils/WrapType'
import { UserDao } from '../domain/dao/UserDao'
import { User } from '../domain/models/User'

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
