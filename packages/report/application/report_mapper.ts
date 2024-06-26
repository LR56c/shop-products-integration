import { Errors } from '../../shared/domain/exceptions/errors'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidULIDException } from '../../shared/domain/exceptions/InvalidULIDException'
import { InvalidURLException } from '../../shared/domain/exceptions/InvalidURLException'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../shared/domain/value_objects/valid_date'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { ValidURL } from '../../shared/domain/value_objects/valid_url'
import { wrapType } from '../../shared/utils/wrap_type'
import { ReportTypeException } from '../domain/exception/ReportTypeException'
import { Report } from '../domain/models/report'
import { ReportType } from '../domain/models/report_type'

export function reportToJson( report: Report ): Record<string, any> {
	return {
		id         : report.id.value,
		url        : report.url.value,
		name       : report.name.value,
		report_type: report.type.value,
		created_at : report.creationDate.value
	}
}

export function reportFromJson( json: Record<string, any> ): Report | Errors {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidStringException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		throw [ new InvalidULIDException() ]
	}

	const name = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.name ) )

	if ( name instanceof InvalidStringException ) {
		errors.push( new InvalidURLException() )
	}

	const url = wrapType<ValidURL, InvalidURLException>(
		() => ValidURL.from( json.url ) )

	if ( url instanceof BaseException ) {
		errors.push( new InvalidURLException() )
	}

	const type = wrapType<ReportType, ReportTypeException>(
		() => ReportType.from( json.report_type ) )

	if ( type instanceof BaseException ) {
		errors.push( new ReportTypeException() )
	}

	const created_at = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.created_at ) )

	if ( created_at instanceof BaseException ) {
		errors.push( new InvalidDateException() )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}

	return new Report(
		id as UUID,
		name as ValidString,
		url as ValidURL,
		type as ReportType,
		created_at as ValidDate
	)
}
