import { ReportDAO } from 'packages/report/domain/repository/report_dao'
import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { Errors } from 'packages/shared/domain/exceptions/errors'
import { UUID } from 'packages/shared/domain/value_objects/uuid'
import {
	wrapType,
	wrapTypeErrors
} from 'packages/shared/utils/wrap_type'

export const DeleteReport = async ( repo: ReportDAO,
	id: string ): Promise<boolean | Errors> => {

	const idResult = wrapType( () => UUID.from( id ) )

	if ( idResult instanceof BaseException ) {
		return new Errors( [ idResult ] )
	}

	return await wrapTypeErrors( () => repo.delete( idResult ) )

}
