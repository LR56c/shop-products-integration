import { ReportType } from '../domain/models/report_type'
import { ReportDAO } from '../domain/repository/report_dao'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { ValidURL } from '../../shared/domain/value_objects/valid_url'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'

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
