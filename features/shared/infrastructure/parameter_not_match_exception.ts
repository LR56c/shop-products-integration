import { InfrastructureException } from './infrastructure_exception'

export class ParameterNotMatchException extends InfrastructureException {
	constructor(readonly field?: string, readonly value?: string) {
		super( value, field)
		this.message = `${this.message}.parameter_not_match`
		this.name = "ParameterNotMatchException"
	}
}
