import { Email } from '../../../shared/domain/value_objects/Email'
import { Role } from '../../../shared/domain/value_objects/Role'
import { UUID } from '../../../shared/domain/value_objects/UUID'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'
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
