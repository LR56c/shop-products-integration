import { UUID } from '../../../shared/domain/value_objects/UUID'
import { ValidInteger } from '../../../shared/domain/value_objects/ValidInteger'
import { ValidDate } from '../../../shared/domain/value_objects/ValidDate'
import { ValidBool } from '../../../shared/domain/value_objects/ValidBool'
import { ValidString } from '../../../shared/domain/value_objects/ValidString'
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
