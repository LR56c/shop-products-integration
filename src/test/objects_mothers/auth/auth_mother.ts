import { UUIDMother } from '../shared/uuid_mother'
import { Auth } from '../../../../packages/auth/domain/auth'
import { UUID } from '../../../../packages/shared/domain/value_objects/uuid'
import { ValidString } from '../../../../packages/shared/domain/value_objects/valid_string'

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
