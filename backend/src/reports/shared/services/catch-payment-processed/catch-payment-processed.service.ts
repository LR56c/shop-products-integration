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
				payload.id,
				payload.creationDate,
				payload.paymentValue,
			)

			await this.repo.create( reportPayment )
		}
		catch ( e ) {
			console.log(
				`failed replicate payment id: ${ payload.id.value }` )
			console.log( e )
		}
	}
}
