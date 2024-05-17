import { Injectable } from '@nestjs/common'
import { Payment } from '~features/payments/domain/models/payment'
import { PaymentRepository } from '~features/payments/domain/repository/payment_repository'

@Injectable()
export class UpdatePaymentService {
	constructor( private repository: PaymentRepository ) {}

	async updatePayment( payment: Payment ): Promise<boolean> {
		return this.repository.updatePayment( payment )
	}
}
