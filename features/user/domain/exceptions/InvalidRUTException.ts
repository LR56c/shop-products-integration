import { BaseException } from '../../../shared/domain/exceptions/BaseException'

export class InvalidRUTException extends BaseException {
	constructor( message?: string, readonly value?: string ) {
		super( message != null ? message : 'invalid.rut', value )
		this.name = 'InvalidRUTException'
	}
}
