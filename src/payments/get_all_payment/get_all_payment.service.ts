import { Injectable } from '@nestjs/common'
import { GetAllPayments } from 'packages/payments/application/get_all_payments'
import { Payment } from 'packages/payments/domain/models/payment'
import { PaymentRepository } from 'packages/payments/domain/repository/payment_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class GetAllPaymentService {
	constructor( private repository: PaymentRepository ) {}

	async getAll( from: number, to: number, approved?: boolean,
		from_date?: string, to_date?: string ): Promise<Payment[]> {
		const result = await GetAllPayments( this.repository,
			{ from, to, approved, from_date, to_date } )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}
		return result
	}
}
