import { InvalidBooleanException } from '../exceptions/InvalidBooleanException'
import { z } from 'zod'

export class ValidBool {
	readonly value: boolean

	private constructor( value: boolean ) {
		this.value = value
	}

	/**
	 * Create a ValidBool instance
	 * @throws {InvalidBooleanException} - if number is invalid
	 */
	static from( value: boolean ): ValidBool {
		const result = z.boolean().safeParse(value)
		if ( result.success === false ) {
			throw new InvalidBooleanException()
		}
		return new ValidBool( result.data )
	}
}
