import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { InvalidRoleException } from '~features/shared/domain/exceptions/InvalidRoleException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { Role } from '~features/shared/domain/value_objects/Role'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { InvalidRUTException } from '~features/user/domain/exceptions/InvalidRUTException'
import { RUT } from '~features/user/domain/models/RUT'
import { User } from '~features/user/domain/models/User'
import { CreateUserDto } from './create_user_dto'

export function parseUser( dto: CreateUserDto ): User
{
	const errors: BaseException[] = []

	const auth_id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( dto.auth_id ) )

	if ( auth_id instanceof BaseException ) {
		errors.push( auth_id )
	}

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

	return new User(
		auth_id as UUID,
		rut as RUT,
		name as ValidString,
		email as Email,
		role as Role
	)
}
