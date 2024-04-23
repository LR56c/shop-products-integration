import { UnknownException } from '../domain/exceptions/UnknownException'

// genericos = T
export function wrapType<T, Err extends Error>( returnFunction: () => T): T | Error {
	try {
		return returnFunction()
	}
	catch ( e: unknown ) {
		const err = e as Err
		if ( e instanceof Error && e.message === err.message ) {
			return err
		}
		else {
			return new UnknownException()
		}
	}
}
