import { InfrastructureException } from './infrastructure_exception'

export class KeyAlreadyExistException extends InfrastructureException {
	constructor(readonly field?: string, message?: string, readonly value?: string) {
		super( `key_already_exist${message != null ? `.${message}`:''}`, value, field)
		this.name = "KeyAlreadyExistException"
	}
}
