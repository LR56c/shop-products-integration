import { Email } from '../../shared/domain/value_objects/Email'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'

export class Cart {
	constructor(
		readonly userEmail: Email,
		readonly product: UUID,
		readonly quantity: ValidInteger
	)
	{}
}

