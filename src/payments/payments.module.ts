import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { PaymentRepository } from '../../packages/payments/domain/repository/payment_repository'
import { PaymentSupabaseData } from '../../packages/payments/infrastructure/payment_supabase_data'
import { Database } from '../../database.types'
import { AppModule } from '../app.module'
import { CreatePaymentController } from './create_payment/create_payment.controller'
import { CreatePaymentService } from './create_payment/create_payment.service'
import { DeletePaymentController } from './delete_payment/delete_payment.controller'
import { DeletePaymentService } from './delete_payment/delete_payment.service'
import { GetAllPaymentController } from './get_all_payment/get_all_payment.controller'
import { GetAllPaymentService } from './get_all_payment/get_all_payment.service'
import { GetPaymentController } from './get_payment/get_payment.controller'
import { GetPaymentService } from './get_payment/get_payment.service'
import { UpdatePaymentController } from './update_payment/update_payment.controller'
import { UpdatePaymentService } from './update_payment/update_payment.service'

@Module( {
	controllers: [
		CreatePaymentController, DeletePaymentController,
		GetPaymentController, UpdatePaymentController,
		GetAllPaymentController
	],
	providers  : [ {
		provide   : PaymentRepository,
		useFactory: ( client: SupabaseClient<Database> ) => {
			return new PaymentSupabaseData( client )
		},
		inject    : [ SupabaseClient<Database> ]
	},
		CreatePaymentService, DeletePaymentService,
		GetPaymentService, UpdatePaymentService,
		GetAllPaymentService
	],
	imports    : [
		forwardRef( () => AppModule )
	]
} )
export class PaymentsModule {}
