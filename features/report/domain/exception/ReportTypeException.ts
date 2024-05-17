import { BaseException } from '../../../shared/domain/exceptions/BaseException'

export class ReportTypeException extends BaseException {
	constructor( readonly field?: string, message?: string,
		readonly value?: string )
	{
		super( `invalid.boolean${ message != null ? `.${ message }` : '' }`, value,
			field )
		this.name = 'ReportTypeException'
	}
}
