import { Injectable } from '@nestjs/common'
import { DeletePayment } from '../../../packages/payments/application/delete_payment'
import { PaymentRepository } from '../../../packages/payments/domain/repository/payment_repository'
import { BaseException } from '../../../packages/shared/domain/exceptions/BaseException'

@Injectable()
export class DeletePaymentService {
	constructor( private repository: PaymentRepository ) {}

	async deletePayment( id: string ): Promise<boolean> {
		const result = await DeletePayment( this.repository, id )

		if ( result instanceof BaseException ) {
			throw [ result ]

		}
		return true
	}
}
