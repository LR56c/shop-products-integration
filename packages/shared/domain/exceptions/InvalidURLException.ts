import { BaseException } from './BaseException'

export class InvalidURLException extends BaseException {
	constructor( readonly field?: string, message?: string,
		readonly value?: string )
	{
		super( message != null ? message : 'invalid.url', value, field )
		this.name = 'InvalidURLException'
	}
}
