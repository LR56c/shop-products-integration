export class EmailError extends Error {
	constructor(message?: string) {
		super(`EmailError${message == null ? '' : `: ${message}`}`)
	}
}
