import { Module } from '@nestjs/common'
import { CreatePaymentController } from './create_payment.controller'
import { CreatePaymentService } from './create_payment.service'

@Module( {
	controllers: [ CreatePaymentController ],
	providers  : [ CreatePaymentService ]
} )
export class CreatePaymentModule {}
