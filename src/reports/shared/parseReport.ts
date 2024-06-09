import { ReportTypeException } from 'packages/report/domain/exception/ReportTypeException'
import { ReportType } from 'packages/report/domain/models/report_type'
import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { InvalidDateException } from 'packages/shared/domain/exceptions/InvalidDateException'
import { InvalidURLException } from 'packages/shared/domain/exceptions/InvalidURLException'
import { InvalidUUIDException } from 'packages/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from 'packages/shared/domain/value_objects/uuid'
import { ValidDate } from 'packages/shared/domain/value_objects/valid_date'
import { ValidURL } from 'packages/shared/domain/value_objects/valid_url'
import { wrapType } from 'packages/shared/utils/wrap_type'
import { CreateReportDto } from './create_report_dto'

export function parseReport( dto: CreateReportDto ): {
	errors: BaseException[],
	data: {
		id: UUID,
		url: ValidURL,
		type: ReportType,
		creationDate: ValidDate
	}
}
{
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( dto.id ) )
	if ( id instanceof BaseException ) {
		errors.push( id )
	}

	const url = wrapType<ValidURL, InvalidURLException>(
		() => ValidURL.from( dto.url ) )
	if ( url instanceof BaseException ) {
		errors.push( url )
	}

	const type = wrapType<ReportType, ReportTypeException>(
		() => ReportType.from( dto.type ) )
	if ( type instanceof BaseException ) {
		errors.push( type )
	}

	const creationDate = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( dto.creationDate ) )
	if ( creationDate instanceof BaseException ) {
		errors.push( creationDate )
	}

	return {
		errors,
		data: {
			id          : id as UUID,
			url         : url as ValidURL,
			type        : type as ReportType,
			creationDate: creationDate as ValidDate
		}
	}
}
