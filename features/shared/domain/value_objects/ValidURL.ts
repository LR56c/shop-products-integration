import { InvalidURLException } from '../exceptions/InvalidURLException'
import { z } from 'zod'

export class ValidURL {
	readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	/**
	 * Create a ValidString instance
	 * @throws {InvalidURLException} - if url is invalid
	 */
	static from( value: string ): ValidURL {
		const result = z.string().url().safeParse(value)
		if ( result.success === false ) {
			throw new InvalidURLException()
		}
		return new ValidURL( result.data )
	}
}
