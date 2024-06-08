import { Email } from '../../shared/domain/value_objects/email'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { UUID } from '../../shared/domain/value_objects/uuid'

export class Cart {
	constructor(
		readonly userEmail: Email,
		readonly product: UUID,
		readonly quantity: ValidInteger
	)
	{}
}

