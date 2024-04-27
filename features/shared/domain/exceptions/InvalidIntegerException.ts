import { BaseException } from './BaseException'

export class InvalidIntegerException extends BaseException {
	constructor(readonly field?: string, message?: string, readonly value?: string) {
		super( `invalid.integer${message != null ? `.${message}`:''}`, value, field)
		this.name = "InvalidIntegerException"
	}
}
