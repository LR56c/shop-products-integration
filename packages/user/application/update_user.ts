import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { InvalidRoleException } from '../../shared/domain/exceptions/InvalidRoleException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { Email } from '../../shared/domain/value_objects/email'
import { Role } from '../../shared/domain/value_objects/role'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { UserDao } from '../domain/dao/UserDao'
import { InvalidRUTException } from '../domain/exceptions/InvalidRUTException'
import { RUT } from '../domain/models/RUT'
import { User } from '../domain/models/User'

export const UpdateUser = async (
	repo: UserDao,
	user: User,
	props: {
		rut?: string,
		name?: string,
		email?: string,
		role?: string
	} ): Promise<boolean | Errors> => {

	const errors: BaseException[] = []

	const rutResult = props.rut !== undefined
		? wrapType<RUT, InvalidRUTException>(
			() => RUT.from( props.rut! ) ) : user.rut

	if ( rutResult instanceof BaseException ) {
		errors.push( new InvalidRUTException( 'rut' ) )
	}

	const nameResult = props.name !== undefined
		? wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( props.name! ) ) : user.name

	if ( nameResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'name' ) )
	}

	const emailResult = props.email !== undefined
		? wrapType<Email, EmailException>(
			() => Email.from( props.email! ) ) : user.email

	if ( emailResult instanceof BaseException ) {
		errors.push( new EmailException( 'email' ) )
	}

	const roleResult = props.role !== undefined
		? wrapType<Role, InvalidRoleException>(
			() => Role.from( props.role! ) ) : user.role

	if ( roleResult instanceof BaseException ) {
		errors.push( new InvalidRoleException( 'role' ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	const newUser = new User(
		user.auth_id,
		rutResult as RUT,
		nameResult as ValidString,
		emailResult as Email,
		roleResult as Role
	)

	return await wrapTypeErrors( () => repo.updateUser( user.email, newUser ) )
}
