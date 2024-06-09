import { Report } from 'packages/report/domain/models/report'
import { ReportType } from 'packages/report/domain/models/report_type'
import { ReportDAO } from 'packages/report/domain/repository/report_dao'
import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { Errors } from 'packages/shared/domain/exceptions/errors'
import { ValidDate } from 'packages/shared/domain/value_objects/valid_date'
import { ValidInteger } from 'packages/shared/domain/value_objects/valid_integer'
import {
	wrapType,
	wrapTypeDefault,
	wrapTypeErrors
} from 'packages/shared/utils/wrap_type'

export const GetAllReports = async ( repo: ReportDAO,
	props: {
		from: number,
		to: number,
		type?: string,
		from_date?: Date,
		to_date?: Date
	} ): Promise<Report[] | Errors> => {

	const errors: BaseException[] = []

	const typeResult = wrapTypeDefault(
		undefined,
		( value ) => ReportType.from( value ),
		props.type
	)

	if ( typeResult instanceof BaseException ) {
		errors.push( typeResult )
	}

	const fromResult = wrapType<ValidInteger, BaseException>(
		() => ValidInteger.from( props.from ) )

	if ( fromResult instanceof BaseException ) {
		errors.push( fromResult )
	}

	const toResult = wrapType<ValidInteger, BaseException>(
		() => ValidInteger.from( props.to ) )

	if ( toResult instanceof BaseException ) {
		errors.push( toResult )
	}

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

	return await wrapTypeErrors( () => repo.getAll(
		fromResult as ValidInteger,
		toResult as ValidInteger,
		typeResult as ReportType,
		fromDateResult as ValidDate,
		toDateResult as ValidDate
	) )
}
