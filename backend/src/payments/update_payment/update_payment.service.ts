import { Injectable } from '@nestjs/common'
import { Payment } from '~features/payments/domain/models/payment'
import { PaymentRepository } from '~features/payments/domain/repository/payment_repository'
import {UpdatePaymentDto} from "./update_payment_dto";
import {UpdatePayment} from "~features/payments/application/update_payments";

@Injectable()
export class UpdatePaymentService {
	constructor( private repository: PaymentRepository ) {}

	async updatePayment( props: UpdatePaymentDto ): Promise<boolean> {
		return UpdatePayment( this.repository, {
			id: props.id,
			creationDate: props.creationDate,
			approved: props.approved,
			deliveryName: props.deliveryName,
			paymentValue: props.paymentValue,
			paymentMethod: props.paymentMethod
		} )
	}
}
