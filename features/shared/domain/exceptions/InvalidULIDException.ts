import { BaseException } from './BaseException'

export class InvalidULIDException extends BaseException {
	constructor(message?: string, readonly rawValue?: string) {
		super(message != null ? message : "ulid", rawValue)
		this.name = "InvalidULIDException"
	}
}
