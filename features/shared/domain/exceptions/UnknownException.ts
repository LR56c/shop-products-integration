import { BaseException } from './BaseException'

export class UnknownException extends BaseException {
	constructor(message?: string, readonly value?: string) {
		super(message != null ? message : "invalid.unknown", value)
		this.name = "UnknownException"
	}
}
