import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Email } from '../../shared/domain/value_objects/Email'
import { UserDao } from '../domain/dao/UserDao'
import { wrapType } from '../../shared/utils/WrapType'
import { BaseException } from '../../shared/domain/exceptions/BaseException'

export const DeleteUser = async (
	repo: UserDao,
	email: string ): Promise<boolean> => {

	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( email ) )

	if ( emailResult instanceof BaseException ) {
		throw [ new EmailException() ]
	}

	return repo.deleteUser( emailResult )
}
