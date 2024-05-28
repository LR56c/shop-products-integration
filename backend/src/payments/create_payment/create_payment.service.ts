import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Payment } from '~features/payments/domain/models/payment'
import { PaymentRepository } from '~features/payments/domain/repository/payment_repository'
import { PaymentProcessedEvent } from '~features/shared/domain/events/payment_processed_event'
import {PaymentDto} from "../shared/payment_dto";
import {CreatePayment} from "~features/payments/application/creat_payment";

@Injectable()
export class CreatePaymentService {
	constructor( private repository: PaymentRepository,
		private eventEmitter: EventEmitter2 )
	{}

	async createPayment( payment: PaymentDto ): Promise<boolean> {
		return CreatePayment( this.repository, {
			id: payment.id,
			creationDate: payment.creationDate,
			approved: payment.approved,
			deliveryName: payment.deliveryName,
			paymentValue: payment.paymentValue,
			paymentMethod: payment.paymentMethod
		} )
	}
}
