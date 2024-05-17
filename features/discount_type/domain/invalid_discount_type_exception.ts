import { BaseException } from '../../shared/domain/exceptions/BaseException'

export class InvalidDiscountTypeException extends BaseException {
	constructor( readonly field?: string, message?: string,
		readonly value?: string )
	{
		super( `invalid.discount.type${ message != null ? `.${ message }` : '' }`,
			value, field )
		this.name = 'InvalidDiscountTypeException'
	}
}
