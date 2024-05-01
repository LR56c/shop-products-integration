import { BaseException } from 'features/shared/domain/exceptions/BaseException'
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

export function wrapTypes<T, Err extends BaseException>( returnFunction: () => T ): T | BaseException[] {
	try {
		return returnFunction()
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

		return errors
	}
}
