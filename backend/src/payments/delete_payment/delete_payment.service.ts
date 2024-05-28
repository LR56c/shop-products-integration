import { Injectable } from '@nestjs/common'
import { PaymentRepository } from '~features/payments/domain/repository/payment_repository'
import {DeletePayment} from "~features/payments/application/delete_payment";

@Injectable()
export class DeletePaymentService {
	constructor( private repository: PaymentRepository ) {}

	async deletePayment( id: string ): Promise<boolean> {
		return DeletePayment( this.repository, id )
	}
}
