import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { CreatePaymentDto } from 'src/payments/dto/create_payment_dto'
import { CreatePayment } from '~features/payments/application/create_payment'
import { PaymentRepository } from '~features/payments/domain/repository/payment_repository'
import { PaymentProcessedEvent } from '~features/shared/domain/events/payment_processed_event'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class CreatePaymentService {
	constructor( private repository: PaymentRepository,
		private eventEmitter: EventEmitter2 )
	{}

	async createPayment( payment: CreatePaymentDto ): Promise<boolean> {
		const result = await CreatePayment( this.repository, {
			id            : payment.id,
			delivery_ame  : payment.delivery_name,
			payment_value : payment.payment_value,
			payment_method: payment.payment_method
		} )

		if ( result instanceof Errors) {
			throw [ ...result.values ]
		}
		this.eventEmitter.emit( PaymentProcessedEvent.tag, {
			payment: result
		} )
		return true
	}
}
