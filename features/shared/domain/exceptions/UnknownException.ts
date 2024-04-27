import { BaseException } from './BaseException'

export class UnknownException extends BaseException {
	constructor(message?: string, readonly rawValue?: string) {
		super(message != null ? message : "unknown", rawValue)
		this.name = "UnknownException"
	}
}
