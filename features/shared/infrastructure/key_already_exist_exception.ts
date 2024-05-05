import { InfrastructureException } from './infrastructure_exception'

export class KeyAlreadyExistException extends InfrastructureException {
	constructor(readonly field?: string, readonly value?: string) {
		super( value, field)
		this.message = `${this.message}key_already_exist`
		this.name = "KeyAlreadyExistException"
	}
}
