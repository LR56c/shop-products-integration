import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { Payment } from '~features/payments/domain/models/payment'
import { PaymentRepository } from '~features/payments/domain/repository/payment_repository'
import { PaymentProcessedEvent } from '~features/shared/domain/events/payment_processed_event'

@Injectable()
export class CreatePaymentService {
	constructor( private repository: PaymentRepository,
		private eventEmitter: EventEmitter2 )
	{}

	async createPayment( payment: Payment ): Promise<boolean> {
		const result = await this.repository.createPayment( payment )
		if ( result ) {
			this.eventEmitter.emit( PaymentProcessedEvent.tag, {
				payment: payment
			} )
		}

		return result
	}
}
