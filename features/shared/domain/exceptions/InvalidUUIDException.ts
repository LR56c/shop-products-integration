import { BaseException } from './BaseException'

export class InvalidUUIDException extends BaseException {
	constructor(message?: string, readonly rawValue?: string) {
		super(message != null ? message : "uuid", rawValue)
		this.name = "InvalidUUIDException"
	}
}
