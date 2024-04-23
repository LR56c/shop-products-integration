import { EmailException } from '../exceptions/EmailException'
import { z } from 'zod'

export class Email {
	readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	/**
	 * Create an Email instance
	 * @throws {EmailException} - if string is invalid
	 */
	static from( value: string ): Email {
		const parseValue = z.string().email()
		           .safeParse( value )
		if ( !parseValue.success ) {
			throw new EmailException()
		}
		return new Email( parseValue.data )
	}
}
