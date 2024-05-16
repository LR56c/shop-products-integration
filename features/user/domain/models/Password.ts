import { BaseException } from 'features/shared/domain/exceptions/BaseException'
import {
	PasswordInsufficientCharacterException,
	PasswordInsufficientLengthException,
	PasswordInsufficientLowercaseException,
	PasswordInsufficientNumberException,
	PasswordInsufficientUppercaseException
} from '../exceptions/PasswordException'
import { z } from 'zod'

export class Password {
	readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	/**
	 * Create a Password instance
	 * @throws {PasswordInsufficientLengthException} - if password length is invalid
	 * @throws {PasswordInsufficientUppercaseException} - if password uppercase is invalid
	 * @throws {PasswordInsufficientLowercaseException} - if password lowercase is invalid
	 * @throws {PasswordInsufficientNumberException} - if password number is invalid
	 * @throws {PasswordInsufficientCharacterException} - if password character is invalid
	 */
	static from( value: string ): Password {

		const parseValue = z.string()
		                    .min( 8 )
		                    .regex( RegExp( /^(?=.*[a-z]).*$/ ),
			                    { message: 'lowercase' } )
		                    .regex( RegExp( /^(?=.*[A-Z]).*$/ ),
			                    { message: 'uppercase' } )
		                    .regex( RegExp( /^(?=.*\d).*$/ ), { message: 'number' } )
		                    .regex( RegExp( /^(?=.*[$@!?&]).*$/ ),
			                    { message: 'character' } )
		                    .safeParse( value )

		if ( parseValue.success === false ) {
			const errors: BaseException[] = []
			for ( let e of parseValue.error.errors ) {

				if ( e.message === 'lowercase' ) {
					errors.push( new PasswordInsufficientLowercaseException() )
				}
				else if ( e.message === 'uppercase' ) {
					errors.push( new PasswordInsufficientUppercaseException() )
				}
				else if ( e.message === 'number' ) {
					errors.push( new PasswordInsufficientNumberException() )
				}
				else if ( e.message === 'character' ) {
					errors.push( new PasswordInsufficientCharacterException() )
				}
				else {
					errors.push( new PasswordInsufficientLengthException( '8' ) )
				}
			}
			if ( errors.length > 0 ) {
				throw errors
			}
		}

		return new Password( value )
	}
}

