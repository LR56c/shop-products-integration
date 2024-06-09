import { BaseException } from './BaseException'

export class InvalidULIDException extends BaseException {
	constructor( message?: string, readonly value?: string ) {
		super( message != null ? message : 'invalid.id', value )
		this.name = 'InvalidULIDException'
	}
}
