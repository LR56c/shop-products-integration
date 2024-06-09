import { FakerFirstNameMother } from './faker/faker_name_mother'
import { ValidString } from '../../../../packages/shared/domain/value_objects/valid_string'

export class ValidStringMother {
	static random(): ValidString {
		return ValidString.from( FakerFirstNameMother.random() )
	}

	static invalid(): ValidString {
		return ValidString.from( '' )
	}
}
