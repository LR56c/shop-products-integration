import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { InvalidUUIDException } from '../exceptions/InvalidUUIDException'

export class UUID {
	readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	static create(): UUID {
		return new UUID( uuidv4() )
	}

	/**
	 * Create a UUID instance
	 * @throws {InvalidUUIDException} - if uuid is invalid
	 */
	static from( value: string ): UUID {
		const result = z.string()
		                .uuid()
		                .safeParse( value )
		if ( result.success === false ) {
			throw new InvalidUUIDException()
		}

		return new UUID( result.data )
	}
}
