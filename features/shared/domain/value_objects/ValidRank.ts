import { z } from 'zod'
import { InvalidRankException } from '../exceptions/InvalidRankException'

export class ValidRank {
	readonly value: number

	private constructor( value: number ) {
		this.value = value
	}

	/**
	 * Create a ValidRank instance
	 * @throws {InvalidRankException} - if rank is invalid
	 */

	static from( value: number ): ValidRank {
		const n      = Number( value )
		const result = z.number()
		                .min( 0 )
		                .max( 5 )
		                .safeParse( n )
		if ( result.success === false ) {
			throw new InvalidRankException()
		}
		return new ValidRank( n )
	}
}
