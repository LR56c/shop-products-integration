import { InvalidPercentageException } from '../exceptions/InvalidPercentageException'
import { z } from 'zod'

export class Percentage {
	readonly value: number

	private constructor( value: number ) {
		this.value = value
	}

	/**
	 * Create a InvalidPercentageException instance
	 * @throws {InvalidPercentageException} - if Percentage is invalid
	 */
	static from( value: number ): Percentage {
		const result = z.number().nonpositive().lte(100).safeParse(value)
		if ( result.success === false ) {
			throw new InvalidPercentageException()
		}

		return new Percentage( result.data )
	}
}
