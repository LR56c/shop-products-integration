import { Injectable } from '@nestjs/common'
import { GetPayment } from 'packages/payments/application/get_payment'
import { Payment } from 'packages/payments/domain/models/payment'
import { PaymentRepository } from 'packages/payments/domain/repository/payment_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class GetPaymentService {
	constructor( private repository: PaymentRepository ) {}

	async getPayment( id: string ): Promise<Payment> {
		const result = await GetPayment( this.repository, id )

		if(result instanceof Errors) {
			throw [...result.values]
		}

		return result
	}
}

