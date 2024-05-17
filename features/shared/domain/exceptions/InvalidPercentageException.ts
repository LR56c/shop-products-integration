import { BaseException } from './BaseException'

export class InvalidPercentageException extends BaseException {
	constructor( readonly field?: string, message?: string,
		readonly value?: string )
	{
		super( `invalid.percentage${ message != null ? `.${ message }` : '' }`,
			value, field )
		this.name = 'InvalidPercentageException'
	}
}
