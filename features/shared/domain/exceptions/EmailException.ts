import { BaseException } from './BaseException'

export class EmailException extends BaseException {
	constructor(message?: string, readonly rawValue?: string) {
		super(message != null ? message : "email", rawValue)
		this.name = "EmailException"
	}
}
