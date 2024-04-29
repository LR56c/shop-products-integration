import { InvalidDateException } from '../exceptions/InvalidDateException'
import {
	z
} from 'zod'

export class ValidDate {
	readonly value: Date

	private constructor( value: Date ) {
		this.value = value
	}

	/**
	 * Create a ValidDate instance
	 * @throws {InvalidDateException} - if date is invalid
	 */
	static from( value: string | Date | number ): ValidDate {

		const parsedDate = new Date( value )

		const result     = z.date().safeParse( parsedDate )

		if ( result.success === false ) {
			throw new InvalidDateException()
		}
		return new ValidDate( parsedDate )
	}
}
