import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'

export class Cart {
	constructor(
		readonly userEmail: Email,
		readonly product: UUID,
		readonly quantity: ValidInteger
	)
	{}
}

