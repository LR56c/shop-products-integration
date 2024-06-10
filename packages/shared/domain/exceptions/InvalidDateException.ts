import { BaseException } from './BaseException'

export class InvalidDateException extends BaseException {
	constructor( readonly field?: string, message?: string,
		readonly value?: string )
	{
		super( message != null ? message : 'invalid.date', value, field )
		this.name = 'InvalidDateException'
	}
}
