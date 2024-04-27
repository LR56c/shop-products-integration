import { BaseException } from './BaseException'

export class InvalidIntegerException extends BaseException {
	constructor(message?: string, readonly rawValue?: string) {
		super(message != null ? message : "integer", rawValue)
		this.name = "InvalidIntegerException"
	}
}
