import { BaseException } from '../../../shared/domain/exceptions/BaseException'

export class InvalidRankException extends BaseException {
	constructor(message?: string, readonly value?: string) {
		super(message != null ? message : "invalid.rank", value)
		this.name = "InvalidRankException"
	}
}
