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
		const n = Number(value)
		const result = z.number().min(0).int().safeParse(n)
		if ( result.success === false ) {
			throw new InvalidIntegerException()
		}
		return new ValidInteger( n )
	}
}
