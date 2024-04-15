export class InvalidULIDException extends Error {
	constructor(message?: string) {
		super(`InvalidULIDException${message == null ? '' : `: ${message}`}`)
	}
}
