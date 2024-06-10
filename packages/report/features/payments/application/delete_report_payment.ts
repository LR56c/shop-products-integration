import { Errors } from '../../../../shared/domain/exceptions/errors'
import { ReportPaymentRepository } from '../domain/report_payment_repository'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { UUID } from '../../../../shared/domain/value_objects/uuid'
import {
	wrapType,
	wrapTypeErrors
} from '../../../../shared/utils/wrap_type'

export const DeleteReportPayment = async ( repo: ReportPaymentRepository,
	id: string ): Promise<boolean | Errors> => {

	const idResult = wrapType( () => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		return new Errors( [ idResult ] )
	}

	return await wrapTypeErrors( () => repo.delete( idResult ) )
}
