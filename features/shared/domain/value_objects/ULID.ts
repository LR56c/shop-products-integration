import { InvalidULIDException } from 'features/shared/domain/exceptions/InvalidUUIDException'
import {
	decodeTime,
	ulid
} from 'ulid'
import { z } from 'zod'

export class ULID {
	readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	static create(): ULID {
		return new ULID( ulid() )
	}

	static from( value: string ): ULID {
		const result = z.string()
		                .ulid()
		                .safeParse( value )
		if ( result.success === false ) {
			throw new InvalidULIDException()
		}

		return new ULID( result.data )
	}

	static toTime(value : string): number {
		return decodeTime(value)
	}

	static fromTime(value : number): string {
		return ulid(value)
	}
}