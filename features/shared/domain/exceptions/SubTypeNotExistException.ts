import { BaseException } from './BaseException'

export class SubTypeNotExistException extends BaseException {
	constructor(message?: string, readonly value?: string) {
		super(message != null ? message : "invalid.subtype", value)
		this.name = "SubTypeNotExistException"
	}
}
