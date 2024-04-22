export class PasswordException extends Error {
	constructor(message?: string) {
		super("PasswordException")
		this.name = "password"
	}
}
