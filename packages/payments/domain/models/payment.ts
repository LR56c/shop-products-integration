import { UUID } from '../../../shared/domain/value_objects/uuid'
import { ValidBool } from '../../../shared/domain/value_objects/valid_bool'
import { ValidDate } from '../../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../../shared/domain/value_objects/valid_string'
import { PaymentMethod } from './payment_method'

export class Payment {
	constructor(
		readonly id: UUID,
		readonly creationDate: ValidDate,
		readonly approved: ValidBool,
		readonly deliveryName: ValidString,
		readonly paymentValue: ValidInteger,
		readonly paymentMethod: PaymentMethod )
	{}


}
