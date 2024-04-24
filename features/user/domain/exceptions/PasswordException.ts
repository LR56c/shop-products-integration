export class PasswordInsufficientLowercaseException extends Error {
	constructor(message?: string) {
		super("PasswordInsufficientLowercaseException")
		this.name = "password.lowercase"
	}
}

export class PasswordInsufficientUppercaseException extends Error {
	constructor(message?: string) {
		super("PasswordInsufficientUppercaseException")
		this.name = "password.uppercase"
	}
}

export class PasswordInsufficientNumberException extends Error {
	constructor(message?: string) {
		super("PasswordInsufficientNumberException")
		this.name = "password.uppercase"
	}
}

export class PasswordInsufficientCharacterException extends Error {
	constructor(message?: string) {
		super("PasswordInsufficientCharacterException")
		this.name = "password.character"
	}
}

export class PasswordInsufficientLengthException extends Error {
	constructor(message?: string) {
		super("PasswordInsufficientLengthException")
		this.name = "password.length"
	}
}
