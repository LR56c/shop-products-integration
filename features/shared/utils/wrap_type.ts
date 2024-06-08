import { Errors } from '../domain/exceptions/errors'
import { BaseException } from '../domain/exceptions/BaseException'
import { UnknownException } from '../domain/exceptions/UnknownException'

export function wrapType<T, Err extends BaseException>( returnFunction: () => T ): T | BaseException {
	try {
		return returnFunction()
	}
	catch ( e: unknown ) {
		const err = e as Err
		if ( e instanceof Error && e.name === err.name ) {
			return err
		}
		else {
			return new UnknownException()
		}
	}
}

export async function wrapTypeAsync<T, Err extends BaseException>( returnFunction: () => Promise<T> ): Promise<T | BaseException> {
	try {
		return await returnFunction()
	}
	catch ( e: unknown ) {
		const err = e as Err
		if ( e instanceof Error && e.name === err.name ) {
			return err
		}
		else {
			return new UnknownException()
		}	}
}

export function wrapTypeDefault<T, R>(
	defaultValue: T,
	returnFunction: ( value: R ) => T,
	updaterValue ?: R ): T | BaseException {
	if ( updaterValue === null || updaterValue === undefined ) {
		return defaultValue
	}
	else {
		return wrapType( () => returnFunction( updaterValue ) )
	}
}


export async function wrapTypeErrors<T, Err extends BaseException>( returnFunction: () => T ): Promise<T | Errors> {
	try {
		return await returnFunction()
	}
	catch ( e: unknown ) {
		const err = e as Err

		const errors: BaseException[] = []

		for ( const baseException of e as BaseException[] ) {
			if ( e instanceof Error && err.name === baseException.name ) {
				errors.push( baseException )
			}
			else {
				errors.push( new UnknownException() )
			}
		}

		return new Errors( errors)
	}
}
