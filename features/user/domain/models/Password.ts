import { PasswordException } from '../exceptions/PasswordException'
import { z } from 'zod'

export class Password {
	private readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	/**
	 * Create a Password instance
	 * @throws {PasswordException} - if password is invalid
	 */
	static from( value: string ): Password {
		const parseValue = z.string().superRefine( ( value, ctx ) => {
			                    if ( value.length < 6 ) {
				                    throw new PasswordException()
			                    }
			                    return value
		                    } )
		                    .parse( value )
		return new Password( parseValue )
	}
}
