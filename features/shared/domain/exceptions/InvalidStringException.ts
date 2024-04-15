export class InvalidStringException extends Error {
	constructor(message?: string) {
		super(`InvalidStringException${message == null ? '' : `: ${message}`}`)
	}
}
