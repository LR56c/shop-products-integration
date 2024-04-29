import { BaseException } from './BaseException'

export class EmailException extends BaseException {
	constructor(message?: string, readonly value?: string) {
		super(message != null ? message : "invalid.email", value)
		this.name = "EmailException"
	}
}
