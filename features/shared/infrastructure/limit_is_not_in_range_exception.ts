import { InfrastructureException } from './infrastructure_exception'

export class LimitIsNotInRangeException extends InfrastructureException {
	constructor(readonly field?: string, readonly value?: string) {
		super( value, field)
		this.message = `${this.message}.limit_is_not_in_range`
		this.name = "LimitIsNotInRangeException"
	}
}

