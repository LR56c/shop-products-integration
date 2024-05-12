import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidString } from '../../shared/domain/value_objects/ValidString'

export class Auth {
	constructor(
		readonly id: UUID,
		readonly token: ValidString
	)
	{}
}
