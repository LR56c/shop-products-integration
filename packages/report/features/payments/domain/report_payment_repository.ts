import { ReportPayment } from './report_payment'
import { UUID } from '../../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../../shared/domain/value_objects/valid_integer'

export abstract class ReportPaymentRepository {
	abstract create( reportPayment: ReportPayment ): Promise<boolean>

	abstract delete( id: UUID ): Promise<boolean>

	abstract get( from: ValidInteger, to: ValidInteger,
		from_date?: ValidDate, to_date?: ValidDate ): Promise<ReportPayment[]>
}
