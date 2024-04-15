import { PasswordError } from 'features/user/domain/exceptions/PasswordException'
import { z } from 'zod'

export class Password {
	private readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	static from( value: string ): Password {
		const parseValue = z.string().superRefine( ( value, ctx ) => {
			                    if ( value.length < 6 ) {
				                    throw new PasswordError()
			                    }
			                    return value
		                    } )
		                    .parse( value )
		return new Password( parseValue )
	}
}
