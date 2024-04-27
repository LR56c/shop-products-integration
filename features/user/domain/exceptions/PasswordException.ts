import { BaseException } from '../../../shared/domain/exceptions/BaseException'

export class PasswordInsufficientLowercaseException extends BaseException {
	constructor(message?: string, readonly value?: string) {
		super(message != null ? message : "invalid.password.lowercase", value)
		this.name = "PasswordInsufficientLowercaseException"
	}
}

export class PasswordInsufficientUppercaseException extends BaseException {
	constructor(message?: string, readonly value?: string) {
		super(message != null ? message : "invalid.password.uppercase", value)
		this.name = "PasswordInsufficientUppercaseException"
	}
}

export class PasswordInsufficientNumberException extends BaseException {
	constructor(message?: string, readonly value?: string) {
		super(message != null ? message : "invalid.password.number", value)
		this.name = "PasswordInsufficientNumberException"
	}
}

export class PasswordInsufficientCharacterException extends BaseException {
	constructor(message?: string, readonly value?: string) {
		super(message != null ? message : "invalid.password.special", value)
		this.name = "PasswordInsufficientCharacterException"
	}
}

export class PasswordInsufficientLengthException extends BaseException {
	constructor(message?: string, readonly value?: string) {
		super(message != null ? message : "invalid.password.length", value)
		this.name = "PasswordInsufficientCharacterException"
	}
}
