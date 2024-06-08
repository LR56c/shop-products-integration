import { Injectable } from '@nestjs/common'
import { DeletePayment } from '~features/payments/application/delete_payment'
import { PaymentRepository } from '~features/payments/domain/repository/payment_repository'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'

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
