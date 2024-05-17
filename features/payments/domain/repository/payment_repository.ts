import { Payment } from '../models/payment'
import { UUID } from '../../../shared/domain/value_objects/UUID'
import { ValidBool } from '../../../shared/domain/value_objects/ValidBool'
import { ValidInteger } from '../../../shared/domain/value_objects/ValidInteger'
import { ValidDate } from '../../../shared/domain/value_objects/ValidDate'

export abstract class PaymentRepository {
	abstract createPayment( payment: Payment ): Promise<boolean>

	abstract getPayment( id: UUID ): Promise<Payment>

	abstract getAllPayment( from: ValidInteger, to: ValidInteger,
		approved?: ValidBool,
		from_date?: ValidDate, to_date?: ValidDate ): Promise<Payment[]>

	abstract updatePayment( payment: Payment ): Promise<boolean>

	abstract deletePayment( id: UUID ): Promise<boolean>


}
