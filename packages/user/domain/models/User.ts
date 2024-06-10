import { Email } from '../../../shared/domain/value_objects/email'
import { Role } from '../../../shared/domain/value_objects/role'
import { UUID } from '../../../shared/domain/value_objects/uuid'
import { ValidString } from '../../../shared/domain/value_objects/valid_string'
import { RUT } from './RUT'

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
