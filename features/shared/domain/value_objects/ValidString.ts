import { InvalidStringException } from '../exceptions/InvalidStringException'
import { z } from 'zod'

export class ValidString {
	private readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	/**
	 * Create a ValidString instance
	 * @throws {InvalidStringException} - if string is invalid
	 */
	static from( value: string ): ValidString {
		const result = z.string().min(1).safeParse( value )
		if ( result.success === false ) {
			throw new InvalidStringException()
		}
		return new ValidString( result.data )
	}
}
