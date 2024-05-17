import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'
import { Category } from '../domain/category'

export function categoryFromJson( json: Record<string, any> ): Category | BaseException {
	const name = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.name ) )

	if ( name instanceof BaseException ) {
		throw [ new InvalidStringException( 'name' ) ]
	}

	return new Category(
		name as ValidString
	)
}

export function categoryToJson( categor: Category ): Record<string, any> {
	return {
		name: categor.name.value
	}
}
