import { BaseException } from './BaseException'

export class InvalidStringException extends BaseException {
	constructor(readonly field?: string, message?: string, readonly value?: string) {
		super( `invalid.string${message != null ? `.${message}`:''}`, value, field)
		this.name = "InvalidStringException"
	}
}

