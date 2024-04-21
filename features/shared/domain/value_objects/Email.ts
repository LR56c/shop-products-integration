import { EmailError } from '../exceptions/EmailException'
import { z } from 'zod'

export class Email {
	readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	static from( value: string ): Email {
		const parseValue = z.string().email()
		           .safeParse( value )
		if ( !parseValue.success ) {
			throw new EmailError()
		}
		return new Email( parseValue.data )
	}
}
