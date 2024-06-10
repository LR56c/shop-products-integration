import { faker } from '@faker-js/faker'
import { FakerAlphanumericMother } from './faker/faker_alphanumeric_mother'
import { FakerNumberTextMother } from './faker/faker_number_text_mother'
import { FakerSpecialCharacterSymbolMother } from './faker/faker_special_character_symbol_mother'
import { Password } from '../../../../packages/user/domain/models/Password'

export class PasswordMother {
	static random(): Password {
		const upper    = FakerAlphanumericMother.random( {
			length: 3,
			casing: 'upper'
		} )
		const lower    = FakerAlphanumericMother.random( {
			length: 3,
			casing: 'lower'
		} )
		const charater = FakerSpecialCharacterSymbolMother.random( 3 )
		const numbers  = FakerNumberTextMother.random( 3 )
		const combined = faker.helpers.shuffle(
			[ upper, lower, charater, numbers.toString() ] )
		                      .join( '' )
		return Password.from( combined )
	}

	static invalid(): Password {
		return Password.from( '' )
	}
}
