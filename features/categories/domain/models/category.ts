import { InvalidStringException } from '../../../shared/domain/exceptions/InvalidStringException'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../../shared/utils/WrapType'

export class Category{
	private constructor(
		readonly name : ValidString
	) {}

	static from(
			name: string
	): Category {
		const errors: Error[] = []

		const nameResult = wrapType<ValidString, InvalidStringException>(
			() => ValidString.from( name )
		)

		if ( nameResult instanceof Error ) {
			errors.push( nameResult )
		}

		if ( errors.length > 0 ) {
			throw new Error( errors.toString() )
		}

		return new Category( nameResult as ValidString )
	}
}
