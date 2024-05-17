import { Module } from '@nestjs/common'
import { GetPaymentController } from './get_payment.controller'
import { GetPaymentService } from './get_payment.service'

@Module( {
	controllers: [ GetPaymentController ],
	providers  : [ GetPaymentService ]
} )
export class GetPaymentModule {}
