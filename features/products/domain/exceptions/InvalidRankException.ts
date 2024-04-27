import { BaseException } from '../../../shared/domain/exceptions/BaseException'

export class InvalidRankException extends BaseException {
	constructor(message?: string, readonly rawValue?: string) {
		super(message != null ? message : "rank", rawValue)
		this.name = "InvalidRankException"
	}
}
