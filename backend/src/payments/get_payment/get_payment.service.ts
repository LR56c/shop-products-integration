import { Injectable } from '@nestjs/common'
import { Payment } from '~features/payments/domain/models/payment'
import { PaymentRepository } from '~features/payments/domain/repository/payment_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class GetPaymentService {
	constructor( private repository: PaymentRepository ) {}

	getPayment( id: UUID ): Promise<Payment> {
		return this.repository.getPayment( id )
	}
}

