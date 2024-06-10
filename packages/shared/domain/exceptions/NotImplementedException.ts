import { BaseException } from './BaseException'

export class NotImplementedException extends BaseException {
	constructor( readonly field?: string, message?: string,
		readonly value?: string )
	{
		super( `invalid.notimplemented${ message != null ? `.${ message }` : '' }`,
			value, field )
		this.name = 'NotImplementedException'
	}
}
