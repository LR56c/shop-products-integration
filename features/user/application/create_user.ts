import { UserDao } from '../domain/dao/UserDao'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { wrapType } from '../../shared/utils/WrapType'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { Email } from '../../shared/domain/value_objects/Email'
import { EmailException } from '../../shared/domain/exceptions/EmailException'
import { RUT } from '../domain/models/RUT'
import { InvalidRUTException } from '../domain/exceptions/InvalidRUTException'
import { Role } from '../../shared/domain/value_objects/Role'
import { InvalidRoleException } from '../../shared/domain/exceptions/InvalidRoleException'
import { User } from '../domain/models/User'

export const CreateUser = async (
	repo: UserDao,
	props: {
		authId: string
		rut: string
		name: string
		email: string
		role: string
	} ): Promise<boolean> => {

	const errors: BaseException[] = []

	const authIdResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( props.authId ) )

	if ( authIdResult instanceof BaseException ) {
		errors.push( new InvalidUUIDException( 'authId' ) )
	}

	const rutResult = wrapType<RUT, InvalidRUTException>(
		() => RUT.from( props.rut ) )

	if ( rutResult instanceof BaseException ) {
		errors.push( new InvalidRUTException( 'rut' ) )
	}

	const nameResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.name ) )

	if ( nameResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'name' ) )
	}

	const emailResult = wrapType<Email, EmailException>(
		() => Email.from( props.email ) )

	if ( emailResult instanceof BaseException ) {
		errors.push( new EmailException( 'email' ) )
	}

	const roleResult = wrapType<Role, InvalidRoleException>(
		() => Role.from( props.role ) )

	if ( roleResult instanceof BaseException ) {
		errors.push( new InvalidRoleException( 'role' ) )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	const u = new User(
		authIdResult as UUID,
		rutResult as RUT,
		nameResult as ValidString,
		emailResult as Email,
		roleResult as Role
	)

	await repo.createUser( u )
	return true
}
