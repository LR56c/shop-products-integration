import { BaseException } from '../domain/exceptions/BaseException'

export class InfrastructureException extends BaseException {
	constructor(readonly field?: string, message?: string, readonly value?: string) {
		super( `infrastructure${message != null ? `.${message}`:''}`, value, field)
		this.name = "InfrastructureException"
	}
}

