import { InfrastructureException } from './infrastructure_exception'

export class DataNotFoundException extends InfrastructureException {

	constructor( readonly field?: string,
		readonly value?: string )
	{
		super( value, field )
		this.message = `${ this.message }.not_found`
		this.name    = 'RankNotFoundException'
	}
}
