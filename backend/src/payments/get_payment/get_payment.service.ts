import { Injectable } from '@nestjs/common'
import { Payment } from '~features/payments/domain/models/payment'
import { PaymentRepository } from '~features/payments/domain/repository/payment_repository'
import {GetPayment} from "~features/payments/application/get_payment";

@Injectable()
export class GetPaymentService {
	constructor( private repository: PaymentRepository ) {}

	getPayment( id: string ): Promise<Payment> {
		return GetPayment( this.repository, id )
	}
}

