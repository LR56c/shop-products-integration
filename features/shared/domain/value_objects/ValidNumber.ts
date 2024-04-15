import { InvalidNumberException } from 'features/shared/domain/exceptions/InvalidNumberException'
import { z } from 'zod'

export class ValidNumber{
	private readonly value: number

	private constructor( value: number ) {
		this.value = value
	}

	static from( value: number ): ValidNumber {
		const result = z.number().safeParse(value)
		if ( result.success === false ) {
			throw new InvalidNumberException()
		}
		return new ValidNumber( result.data )
	}
}
