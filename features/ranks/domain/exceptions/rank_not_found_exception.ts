import { BaseException } from '../../../shared/domain/exceptions/BaseException'

export class RankNotFoundException extends BaseException {

	constructor( readonly field?: string, message?: string,
		readonly value?: string )
	{
		super( message != null ? message : 'invalid.not_found', value, field )
		this.name = 'RankNotFoundException'
	}
}
