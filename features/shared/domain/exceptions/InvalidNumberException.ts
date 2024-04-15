export class InvalidNumberException extends Error {
	constructor(message?: string) {
		super(`InvalidNumberException${message == null ? '' : `: ${message}`}`)
	}
}
