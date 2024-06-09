import { UUIDMother } from '../shared/uuid_mother'
import { Auth } from '~features/auth/domain/auth'
import { UUID } from '~features/shared/domain/value_objects/uuid'
import { ValidString } from '~features/shared/domain/value_objects/valid_string'

export class AuthMother{
	static random(): Auth {
		return new Auth(
			UUIDMother.random(),
			ValidString.from(UUID.create().value)
		)
	}

	static invalid(): Auth {
		return new Auth(
			UUIDMother.invalid(),
			ValidString.from('')
		)
	}
}
