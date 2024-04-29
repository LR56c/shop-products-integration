import { InfrastructureException } from './infrastructure_exception'

export class LimitIsNotInRange extends InfrastructureException {
	constructor(readonly field?: string, message?: string, readonly value?: string) {
		super( `limit_is_not_in_range${message != null ? `.${message}`:''}`, value, field)
		this.name = "LimitIsNotInRange"
	}
}

