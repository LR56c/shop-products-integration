import { z } from 'zod'
import { InvalidDecimalException } from '../exceptions/InvalidDecimalException'

export class ValidDecimal {
	readonly value: number

	private constructor( value: number ) {
		this.value = value
	}

	/**
	 * Create a ValidDecimal instance
	 * @throws {InvalidDecimalException} - if number is invalid
	 */
	static from( value: number ): ValidDecimal {
		const result = z.number()
		                .safeParse( value )
		if ( result.success === false ) {
			throw new InvalidDecimalException()
		}
		return new ValidDecimal( result.data )
	}
}
