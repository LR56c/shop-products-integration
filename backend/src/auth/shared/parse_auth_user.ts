import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { InvalidRoleException } from '~features/shared/domain/exceptions/InvalidRoleException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { Email } from '~features/shared/domain/value_objects/email'
import { Role } from '~features/shared/domain/value_objects/role'
import { ValidString } from '~features/shared/domain/value_objects/valid_string'
import { wrapType } from '~features/shared/utils/wrap_type'
import { InvalidRUTException } from '~features/user/domain/exceptions/InvalidRUTException'
import { RUT } from '~features/user/domain/models/RUT'
import { AuthUserDto } from '../register-auth/auth_user_dto'

export function parseAuthUser( dto: AuthUserDto ): {
	rut: RUT,
	name: ValidString,
	email: Email,
	role: Role
}
{
	const errors: BaseException[] = []

	const rut = wrapType<RUT, InvalidRUTException>(
		() => RUT.from( dto.rut ) )

	if ( rut instanceof BaseException ) {
		errors.push( rut )
	}

	const email = wrapType<Email, EmailException>(
		() => Email.from( dto.email ) )

	if ( email instanceof BaseException ) {
		errors.push( email )
	}

	const name = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( dto.name ) )

	if ( name instanceof BaseException ) {
		errors.push( name )
	}

	const role = wrapType<Role, InvalidRoleException>(
		() => Role.from( dto.role ) )

	if ( role instanceof BaseException ) {
		errors.push( role )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return {
		rut  : rut as RUT,
		name : name as ValidString,
		email: email as Email,
		role : role as Role
	}
}
