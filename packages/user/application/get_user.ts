import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { Role } from '../../shared/domain/value_objects/role'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { UserDao } from '../domain/dao/UserDao'
import { User } from '../domain/models/User'

export const GetUser = async (
	repo: UserDao,
	props: {
		from: number,
		to: number,
		role?: string,
		name?: string
	} ): Promise<User[] | Errors> => {

	const errors: BaseException[] = []

	const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.from ) )

	if ( fromResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'from' ) )
	}

	const toResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.to ) )

	if ( toResult instanceof BaseException ) {
		errors.push( new InvalidIntegerException( 'to' ) )
	}

	const role = props.role === undefined
		? undefined
		: wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( props.role ?? '' ) )

	if ( role != undefined && role instanceof
		BaseException )
	{
		errors.push( new InvalidStringException( 'role' ) )
	}

	const name = props.name === undefined
		? undefined
		: wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( props.name ?? '' ) )

	if ( name != undefined && name instanceof
		BaseException )
	{
		errors.push( new InvalidStringException( 'name' ) )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	return wrapTypeErrors( () => repo.getUser(
		fromResult as ValidInteger,
		toResult as ValidInteger,
		role as Role,
		name as ValidString )
	)
}
