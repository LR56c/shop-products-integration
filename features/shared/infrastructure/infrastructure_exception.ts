import { BaseException } from '../domain/exceptions/BaseException'

export class InfrastructureException extends BaseException {
	constructor( message?: string, readonly field?: string,
		readonly value?: string )
	{
		super( value, field )
		this.message = `infrastructure${ message != null ? `.${ message }` : '' }`
		this.name    = 'InfrastructureException'
	}
}

