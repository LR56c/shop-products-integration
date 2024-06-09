import { ReportPaymentRepository } from 'packages/report/features/payments/domain/report_payment_repository'
import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { Errors } from 'packages/shared/domain/exceptions/errors'
import { UUID } from 'packages/shared/domain/value_objects/uuid'
import {
	wrapType,
	wrapTypeErrors
} from 'packages/shared/utils/wrap_type'

export const DeleteReportPayment = async ( repo: ReportPaymentRepository,
	id: string ): Promise<boolean | Errors> => {

	const idResult = wrapType( () => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		return new Errors( [ idResult ] )
	}

	return await wrapTypeErrors( () => repo.delete( idResult ) )
}
