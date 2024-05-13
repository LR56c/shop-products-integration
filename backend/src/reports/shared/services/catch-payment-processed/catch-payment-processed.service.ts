import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import { ReportPayment } from '~features/report/features/payments/domain/report_payment'
import { ReportPaymentRepository } from '~features/report/features/payments/domain/report_payment_repository'
import { PaymentProcessedEvent } from '~features/shared/domain/events/payment_processed_event'

@Injectable()
export class CatchPaymentProcessedService {
	constructor( private readonly repo: ReportPaymentRepository ) {}

	@OnEvent( PaymentProcessedEvent.tag )
	async handleEvent( payload: PaymentProcessedEvent ) {
		try {
			const reportPayment = new ReportPayment(
				payload.payment.id,
				payload.payment.creationDate,
				payload.payment.paymentValue,
			)

			await this.repo.create( reportPayment )
			console.log('replicated payment id: ', payload.payment.id.value)
		}
		catch ( e ) {
			console.log(
				`failed replicate payment id: ${ payload.payment.id.value }` )
			console.log( e )
		}
	}
}
