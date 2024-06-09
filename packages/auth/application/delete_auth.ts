import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/uuid'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { AuthRepository } from '../domain/auth_repository'

export const DeleteAuth = async (
	repo: AuthRepository,
	id: string
): Promise<boolean | Errors> => {

	const idResult = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( id )
	)

	if ( idResult instanceof BaseException ) {
		return new Errors( [ new InvalidStringException( 'token' ) ] )
	}

	return await wrapTypeErrors( () => repo.delete(
		idResult as UUID
	) )
}
