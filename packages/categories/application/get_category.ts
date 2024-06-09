import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { InvalidIntegerException } from '../../shared/domain/exceptions/InvalidIntegerException'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeDefault,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { Category } from '../domain/category'
import { CategoryRepository } from '../domain/category_repository'

export const GetCategory = async ( repo: CategoryRepository, props: {
	from: number
	to: number
	name?: string
} ): Promise<Category[] | Errors> => {
	const errors: BaseException[] = []

	const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.from ) )

	if ( fromResult instanceof BaseException ) {
		errors.push( fromResult )
	}

	const toResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.to ) )

	if ( fromResult instanceof BaseException ) {
		errors.push( fromResult )
	}

	const nameResult = wrapTypeDefault(
		undefined,
		( value ) => ValidString.from( value ),
		props.name
	)

	if ( nameResult instanceof BaseException ) {
		errors.push( nameResult )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	return await wrapTypeErrors(
		() => repo.get(
			fromResult as ValidInteger,
			toResult as ValidInteger,
			nameResult as ValidString
		) )
}
