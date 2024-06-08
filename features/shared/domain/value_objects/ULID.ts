import {
	decodeTime,
	ulid
} from 'ulid'
import { z } from 'zod'
import { InvalidULIDException } from '../exceptions/InvalidULIDException'

export class ULID {
	readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	static create(): ULID {
		return new ULID( ulid() )
	}

	/**
	 * Create a ULID instance
	 * @throws {InvalidULIDException} - if ulid is invalid
	 */
	static from( value: string ): ULID {
		const result = z.string()
		                .ulid()
		                .safeParse( value )
		if ( result.success === false ) {
			throw new InvalidULIDException()
		}

		return new ULID( result.data )
	}

	static toTime( value: string ): number {
		return decodeTime( value )
	}

	static fromTime( value: number ): string {
		return ulid( value )
	}
}
