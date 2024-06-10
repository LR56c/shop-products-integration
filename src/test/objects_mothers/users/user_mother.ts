import { UUID } from '../../../../packages/shared/domain/value_objects/uuid'
import { User } from '../../../../packages/user/domain/models/User'
import { EmailMother } from '../shared/email_mother'
import { RoleMother } from '../shared/role_mother'
import { RUTMother } from '../shared/rut_mother'
import { UUIDMother } from '../shared/uuid_mother'
import { ValidStringMother } from '../shared/valid_string_mother'

export class UserMother {
	static random( auth_id: UUID ): User {
		return new User(
			auth_id,
			RUTMother.random(),
			ValidStringMother.random(),
			EmailMother.random(),
			RoleMother.random()
		)
	}

	static invalid(): User {
		return new User(
			UUIDMother.invalid(),
			RUTMother.invalid(),
			ValidStringMother.invalid(),
			EmailMother.invalid(),
			RoleMother.invalid()
		)
	}
}
