import { Injectable } from '@nestjs/common'
import { Payment } from '~features/payments/domain/models/payment'
import { PaymentRepository } from '~features/payments/domain/repository/payment_repository'
import {GetAllPayments} from "~features/payments/application/get_all_payments";

@Injectable()
export class GetAllPaymentService {
	constructor( private repository: PaymentRepository ) {}

	async getAll( from: number, to: number, approved?: boolean,
		from_date?: string, to_date?: string ): Promise<Payment[]> {
		return GetAllPayments( this.repository, { from, to, approved, from_date, to_date } )
	}
}
