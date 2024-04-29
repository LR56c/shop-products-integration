import { BaseException } from './BaseException'

export class InvalidDecimalException extends BaseException {
	constructor(readonly field?: string, message?: string, readonly value?: string) {
		super(message != null ? message : "invalid.decimal", value, field)
		this.name = "InvalidDecimalException"
	}
}
