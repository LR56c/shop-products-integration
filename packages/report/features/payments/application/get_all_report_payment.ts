import { ReportPayment } from '../domain/report_payment'
import { ReportPaymentRepository } from '../domain/report_payment_repository'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { Errors } from '../../../../shared/domain/exceptions/errors'

import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import {
	wrapTypeDefault,
	wrapTypeErrors
} from '../../../../shared/utils/wrap_type'

export const GetAllReportPayment = async ( repo: ReportPaymentRepository,
	props: {
		from_date?: Date,
		to_date?: Date
	} ): Promise<ReportPayment[] | Errors> => {

	const errors: BaseException[] = []

	const fromDateResult = wrapTypeDefault(
		undefined,
		( value ) => ValidDate.from( value ),
		props.from_date
	)

	if ( fromDateResult instanceof BaseException ) {
		errors.push( fromDateResult )
	}

	const toDateResult = wrapTypeDefault(
		undefined,
		( value ) => ValidDate.from( value ),
		props.to_date
	)

	if ( toDateResult instanceof BaseException ) {
		errors.push( toDateResult )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	return await wrapTypeErrors( () => repo.get(
		fromDateResult as ValidDate,
		toDateResult as ValidDate
	) )
}
