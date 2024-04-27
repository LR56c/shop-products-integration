import { BaseException } from './BaseException'

export class InvalidDecimalException extends BaseException {
	constructor(message?: string, readonly rawValue?: string) {
		super(message != null ? message : "decimal", rawValue)
		this.name = "InvalidDecimalException"
	}
}
