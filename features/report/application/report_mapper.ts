import { ReportTypeException } from '../domain/exception/ReportTypeException'
import { ReportType } from '../domain/models/report_type'
import { InvalidDateException } from '../../shared/domain/exceptions/InvalidDateException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidULIDException } from '../../shared/domain/exceptions/InvalidULIDException'
import { InvalidURLException } from '../../shared/domain/exceptions/InvalidURLException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidURL } from '../../shared/domain/value_objects/ValidURL'
import { wrapType } from '../../shared/utils/WrapType'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Report } from '../domain/models/report'

export function reportToJson( report: Report ): Record<string, any> {
	return {
		id        : report.id.value,
		url       : report.url.value,
		type      : report.type.value,
		created_at: report.creationDate.value
	}
}

export function reportFromJson( json: Record<string, any> ): Report | BaseException[] {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidStringException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		throw [ new InvalidULIDException() ]
	}

	const url = wrapType<ValidURL, InvalidStringException>(
		() => ValidURL.from( json.url ) )

	if ( url instanceof BaseException ) {
		errors.push( new InvalidURLException() )
	}

	const type = wrapType<ReportType, ReportTypeException>(
		() => ReportType.from( json.type ) )

	if ( type instanceof BaseException ) {
		errors.push( new ReportTypeException() )
	}

	const created_at = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.created_at ) )

	if ( created_at instanceof BaseException ) {
		errors.push( new InvalidDateException() )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	return new Report(
		id as UUID,
		url as ValidURL,
		type as ReportType,
		created_at as ValidDate
	)
}
