import { Injectable } from '@nestjs/common'
import { GetPayment } from '~features/payments/application/get_payment'
import { Payment } from '~features/payments/domain/models/payment'
import { PaymentRepository } from '~features/payments/domain/repository/payment_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'

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

