import { ReportPayment } from './report_payment'
import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'

export abstract class ReportPaymentRepository {
	abstract create( reportPayment: ReportPayment ): Promise<boolean>

	abstract delete( id: UUID ): Promise<boolean>

	abstract get( from: ValidInteger, to: ValidInteger,
		from_date?: ValidDate, to_date?: ValidDate ): Promise<ReportPayment[]>
}
