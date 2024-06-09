import { BaseException } from '../../../shared/domain/exceptions/BaseException'


export abstract class InvalidPasswordException extends BaseException {
	constructor( message?: string, readonly field?: string,
		readonly value?: string )
	{
		super( `invalid.password${ message != null ? `.${ message }` : '' }`, value,
			field )
		this.name = 'InvalidPasswordException'
	}
}

export class PasswordInsufficientLowercaseException
	extends InvalidPasswordException {
	constructor( readonly field?: string, readonly value?: string ) {
		super( value, field )
		this.message = `${ this.message }.lowercase`
		this.name    = 'PasswordInsufficientLowercaseException'
	}
}

export class PasswordInsufficientUppercaseException
	extends InvalidPasswordException {
	constructor( readonly field?: string, readonly value?: string ) {
		super( value, field )
		this.message = `${ this.message }.uppercase`
		this.name    = 'PasswordInsufficientUppercaseException'
	}
}

export class PasswordInsufficientNumberException
	extends InvalidPasswordException {
	constructor( readonly field?: string, readonly value?: string ) {
		super( value, field )
		this.message = `${ this.message }.number`
		this.name    = 'PasswordInsufficientUppercaseException'
	}
}

export class PasswordInsufficientCharacterException
	extends InvalidPasswordException {
	constructor( readonly field?: string, readonly value?: string ) {
		super( value, field )
		this.message = `${ this.message }.special`
		this.name    = 'PasswordInsufficientCharacterException'
	}
}

export class PasswordInsufficientLengthException
	extends InvalidPasswordException {
	constructor( readonly field?: string, readonly value?: string ) {
		super( value, field )
		this.message = `${ this.message }.length`
		this.name    = 'PasswordInsufficientCharacterException'
	}
}
