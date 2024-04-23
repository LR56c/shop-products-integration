export class UnknownException extends Error {
	constructor(message?: string,) {
		super("UnknownException")
		this.name = "unknown"
	}
}
