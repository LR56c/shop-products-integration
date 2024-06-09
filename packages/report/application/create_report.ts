import { ReportType } from 'packages/report/domain/models/report_type'
import { ReportDAO } from 'packages/report/domain/repository/report_dao'
import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { Errors } from 'packages/shared/domain/exceptions/errors'
import { ValidString } from 'packages/shared/domain/value_objects/valid_string'
import { ValidURL } from 'packages/shared/domain/value_objects/valid_url'
import {
	wrapType,
	wrapTypeErrors
} from 'packages/shared/utils/wrap_type'

export const CreateReport = async ( repo: ReportDAO, props: {
	type: ReportType,
	name: string,
	data: Uint8Array,
} ): Promise<ValidURL | Errors> => {

	const nameResult = wrapType( () => ValidString.from( props.name ) )

	if ( nameResult instanceof BaseException ) {
		return new Errors( [ nameResult ] )
	}

	return await wrapTypeErrors( () => repo.create(
		props.type,
		nameResult as ValidString,
		props.data
	) )
}
