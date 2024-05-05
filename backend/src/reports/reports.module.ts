import {
	forwardRef,
	Module
} from '@nestjs/common'
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
		CreateReportService, DeleteReportService, GetReportService
	],
	imports    : [
		forwardRef( () => AppModule )
	]
} )
export class ReportsModule {}
