export class PasswordError extends Error {
	constructor(message?: string) {
		super(`PasswordError${message == null ? '' : `: ${message}`}`)
	}
}
