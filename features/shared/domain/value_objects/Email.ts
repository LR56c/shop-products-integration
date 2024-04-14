import {z} from 'zod'
export class Email {
	private readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	static from( value: string ): Email {
		const parseValue = z.string().email().parse( value)
		return new Email( parseValue )
	}
}
