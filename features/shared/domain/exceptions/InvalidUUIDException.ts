import { BaseException } from './BaseException'

export class InvalidUUIDException extends BaseException {
	constructor(message?: string, readonly value?: string) {
		super(message != null ? message : "invalid.id", value)
		this.name = "InvalidUUIDException"
	}
}
