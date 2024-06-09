import { z } from 'zod'
import { InvalidPercentageException } from '../exceptions/InvalidPercentageException'

export class ValidPercentage {
	readonly value: number

	private constructor( value: number ) {
		this.value = value
	}

	/**
	 * Create a ValidInteger instance
	 * @throws {InvalidPercentageException} - if number is invalid
	 */
	static from( value: number ): ValidPercentage {
		const n      = Number( value )
		const result = z.number()
		                .min( 0 )
		                .max( 100 )
		                .safeParse( n )
		if ( result.success === false ) {
			throw new InvalidPercentageException()
		}
		return new ValidPercentage( n )
	}
}


