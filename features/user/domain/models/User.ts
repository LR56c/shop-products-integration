import { UUID } from 'features/shared/domain/value_objects/uuid'
import { RUT } from './RUT'
import { ValidString } from 'features/shared/domain/value_objects/valid_string'
import { Email } from 'features/shared/domain/value_objects/email'
import { Role } from 'features/shared/domain/value_objects/role'

export class User {
	constructor(
		readonly auth_id: UUID,
		readonly rut: RUT,
		readonly name: ValidString,
		readonly email: Email,
		readonly role: Role
	)
	{}
}
