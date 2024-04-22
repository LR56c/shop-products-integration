import { InvalidIntegerException } from '../exceptions/InvalidIntegerException'
import { z } from 'zod'

export class ValidInteger {
	readonly value: number

	private constructor( value: number ) {
		this.value = value
	}

	/**
	 * Create a ValidInteger instance
	 * @throws {InvalidIntegerException} - if number is invalid
	 */
	static from( value: number ): ValidInteger {
		const result = z.number().int().safeParse(value)
		if ( result.success === false ) {
			throw new InvalidIntegerException()
		}
		return new ValidInteger( result.data )
	}
}
