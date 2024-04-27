import { BaseException } from './BaseException'

export class InvalidDateException extends BaseException {
	constructor(message?: string, readonly rawValue?: string) {
		super(message != null ? message : "date", rawValue)
		this.name = "InvalidDateException"
	}
}
