import { BaseException } from './BaseException'

export class InvalidStringException extends BaseException {
	constructor(message?: string, readonly rawValue?: string) {
		super(message != null ? message : "string", rawValue)
		this.name = "InvalidStringException"
	}
}
