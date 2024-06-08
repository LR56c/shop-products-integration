import { Injectable } from '@nestjs/common'
import { GetAllPayments } from '~features/payments/application/get_all_payments'
import { Payment } from '~features/payments/domain/models/payment'
import { PaymentRepository } from '~features/payments/domain/repository/payment_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class GetAllPaymentService {
	constructor( private repository: PaymentRepository ) {}

	async getAll( from: number, to: number, approved?: boolean,
		from_date?: string, to_date?: string ): Promise<Payment[]> {
		const result = await GetAllPayments( this.repository,
			{ from, to, approved, from_date, to_date } )

		if( result instanceof Errors ) {
			throw [ ...result.values ]
		}
		return result
	}
}
