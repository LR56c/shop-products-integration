import {
	forwardRef,
	Module
} from '@nestjs/common'
import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { CatchPaymentProcessedService } from 'src/reports/shared/services/catch-payment-processed/catch-payment-processed.service'
import { ReportRepository } from '~features/report/domain/repository/report_repository'
import { ReportPaymentRepository } from '~features/report/features/payments/domain/report_payment_repository'
import { ReportPaymentSupabaseData } from '~features/report/features/payments/infrastructure/report_payment_supabase_data'
import { ReportSupabaseData } from '~features/report/infrastructure/report_supabase_data'
import { AppModule } from '../app.module'
import { CreateReportController } from './create-report/create-report.controller'
import { CreateReportService } from './create-report/create-report.service'
import { DeleteReportController } from './delete-report/delete-report.controller'
import { DeleteReportService } from './delete-report/delete-report.service'
import { GetReportController } from './get-report/get-report.controller'
import { GetReportService } from './get-report/get-report.service'

@Module( {
	controllers: [
		CreateReportController, DeleteReportController, GetReportController
	],
	providers  : [
		{
			provide   : ReportRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new ReportSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		{
			provide   : ReportPaymentRepository,
			useFactory: ( client: SupabaseClient<Database> ) => {
				return new ReportPaymentSupabaseData( client )
			},
			inject    : [ SupabaseClient<Database> ]
		},
		CreateReportService, DeleteReportService, GetReportService,
		CatchPaymentProcessedService
	],
	imports    : [
		forwardRef( () => AppModule )
	]
} )
export class ReportsModule {}
