import { z } from 'zod'

export class Password{
	private readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	static from( value: string ): Password {
		// z.string().
		if ( value.length < 6 ) {
			throw new Error( "Password must be at least 6 characters long" )
		}
		return new Password( value )
	}
}
