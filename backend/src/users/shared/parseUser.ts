import { CreateUserDto } from 'src/users/create_user/create_user_dto'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { EmailException } from '~features/shared/domain/exceptions/EmailException'
import { InvalidRoleException } from '~features/shared/domain/exceptions/InvalidRoleException'
import { InvalidStringException } from '~features/shared/domain/exceptions/InvalidStringException'
import { Email } from '~features/shared/domain/value_objects/Email'
import { Role } from '~features/shared/domain/value_objects/Role'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'
import { wrapType } from '~features/shared/utils/WrapType'
import { InvalidRUTException } from '~features/user/domain/exceptions/InvalidRUTException'
import { RUT } from '~features/user/domain/models/RUT'

export function parseUser( dto: CreateUserDto ): {
	errors: BaseException[],
		data: {
		rut: RUT,
			email: Email,
			name: ValidString,
			role: Role,
	}
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

	const name = wrapType<RUT, InvalidStringException>(
		() => ValidString.from( dto.name ) )

	if ( name instanceof BaseException ) {
		errors.push( name )
	}

	const role = wrapType<RUT, InvalidRoleException>(
		() => Role.from( dto.role ) )

	if ( role instanceof BaseException ) {
		errors.push( role )
	}
	return {
		errors,
		data: {
			rut  : rut as RUT,
			email: email as Email,
			name : name as ValidString,
			role : role as Role
		}
	}
}
