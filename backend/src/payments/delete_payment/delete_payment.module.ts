import { Module } from '@nestjs/common'
import { DeletePaymentController } from './delete_payment.controller'
import { DeletePaymentService } from './delete_payment.service'

@Module( {
	controllers: [ DeletePaymentController ],
	providers  : [ DeletePaymentService ]
} )
export class DeletePaymentModule {}
