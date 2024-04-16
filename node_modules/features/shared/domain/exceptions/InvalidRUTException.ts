export class InvalidRUTError extends Error {
	constructor(message?: string) {
		super(`InvalidRUTError${message == null ? '' : `: ${message}`}`)
	}
}
