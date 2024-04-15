import { InvalidStringException } from 'features/shared/domain/exceptions/InvalidStringException'
import { z } from 'zod'

export class ValidString {
	private readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	static from( value: string ): ValidString {
		const result = z.string().min(1).safeParse( value )
		if ( result.success === false ) {
			throw new InvalidStringException()
		}
		return new ValidString( result.data )
	}
}
