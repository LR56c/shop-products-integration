import { Errors } from '../../../../shared/domain/exceptions/errors'

import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidUUIDException } from '../../../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../../shared/domain/value_objects/valid_integer'
import { wrapType } from '../../../../shared/utils/wrap_type'
import { ReportPayment } from '../domain/report_payment'

export function reportPaymentToJson( report: ReportPayment ): Record<string, any> {
	return {
		id   : report.id.value,
		date : report.date.value,
		value: report.value.value
	}
}

export function reportPaymentFromJson( json: Record<string, any> ): ReportPayment | Errors {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	const date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.date ) )

	if ( date instanceof BaseException ) {
		errors.push( new InvalidDateException() )
	}

	const value = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( json.value ) )

	if ( value instanceof BaseException ) {
		errors.push( new InvalidIntegerException() )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	return new ReportPayment(
		id as UUID,
		date as ValidDate,
		value as ValidInteger )
}
