import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { CategoryRepository } from '../domain/category_repository'

export const DeleteCategory = async ( repo: CategoryRepository, props: {
	name: string
} ): Promise<boolean | Errors> => {
	const nameResult = wrapType( () => ValidString.from( props.name ) )

	if ( nameResult instanceof BaseException ) {
		return new Errors( [ nameResult ] )
	}

	return await wrapTypeErrors( () => repo.delete( nameResult as ValidString ) )
}
