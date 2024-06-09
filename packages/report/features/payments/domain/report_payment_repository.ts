import { UUID } from '../../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import { ReportPayment } from './report_payment'

export abstract class ReportPaymentRepository {
	abstract create( reportPayment: ReportPayment ): Promise<boolean>

	abstract delete( id: UUID ): Promise<boolean>

	abstract get( from_date?: ValidDate, to_date?: ValidDate ): Promise<ReportPayment[]>
}
