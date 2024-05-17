import { Module } from '@nestjs/common'
import { GetAllPaymentController } from './get_all_payment.controller'
import { GetAllPaymentService } from './get_all_payment.service'

@Module( {
	controllers: [ GetAllPaymentController ],
	providers  : [ GetAllPaymentService ]
} )
export class GetAllPaymentModule {}
