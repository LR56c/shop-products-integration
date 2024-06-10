import { Errors } from '../../../../shared/domain/exceptions/errors'
import { ReportPayment } from '../domain/report_payment'
import { ReportPaymentRepository } from '../domain/report_payment_repository'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { UUID } from '../../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../../shared/domain/value_objects/valid_integer'
import {
	wrapType,
	wrapTypeDefault,
	wrapTypeErrors
} from '../../../../shared/utils/wrap_type'

export const CreateReportPayment = async ( repo: ReportPaymentRepository,
	props: {
		id?: string
		date: Date
		value: number
	} ): Promise<boolean | Errors> => {

	const errros: BaseException[] = []

	const idResult = wrapTypeDefault(
		UUID.create(),
		( value ) => UUID.from( value ),
		props.id
	)

	if ( idResult instanceof BaseException ) {
		errros.push( idResult )
	}

	const dateResult = wrapType( () => ValidDate.from( props.date ) )

	if ( dateResult instanceof BaseException ) {
		errros.push( dateResult )
	}

	const valueResult = wrapType( () => ValidInteger.from( props.value ) )

	if ( valueResult instanceof BaseException ) {
		errros.push( valueResult )
	}

	if ( errros.length > 0 ) {
		return new Errors( errros )
	}

	const r = new ReportPayment(
		idResult as UUID,
		dateResult as ValidDate,
		valueResult as ValidInteger
	)

	return await wrapTypeErrors( () => repo.create( r ) )
}
