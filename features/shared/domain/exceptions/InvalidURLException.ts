import { BaseException } from './BaseException'

export class InvalidURLException extends BaseException {
	constructor(message?: string, readonly rawValue?: string) {
		super(message != null ? message : "url", rawValue)
		this.name = "InvalidURLException"
	}
}
