import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { UserDao } from '../domain/dao/UserDao'
import { User } from '../domain/models/User'
import { Email } from '../../shared/domain/value_objects/email'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import {
	wrapType,
	wrapTypeAsync
} from '../../shared/utils/wrap_type'

export const GetOneUser = async (
	repo: UserDao,
	email: string ): Promise<User | BaseException> => {

	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( email ) )

	if ( emailResult instanceof EmailException ) {
		return new EmailException( 'email' )
	}

	return wrapTypeAsync(()=>repo.getOneUser( emailResult as Email ))
}
