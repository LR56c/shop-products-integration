import { Module } from '@nestjs/common'
import { UpdatePaymentController } from './update_payment.controller'
import { UpdatePaymentService } from './update_payment.service'

@Module( {
	controllers: [ UpdatePaymentController ],
	providers  : [ UpdatePaymentService ]
} )
export class UpdatePaymentModule {}
