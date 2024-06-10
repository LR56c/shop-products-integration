import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { Auth } from '../domain/auth'
import { AuthRepository } from '../domain/auth_repository'

export const RecoverAuth = async (
	repo: AuthRepository,
	token: string
): Promise<Auth | Errors> => {

	const tokenResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( token )
	)

	if ( tokenResult instanceof BaseException ) {
		return new Errors( [ new InvalidStringException( 'token' ) ] )
	}

	return await wrapTypeErrors( () => repo.recover(
		tokenResult as ValidString
	) )
}
