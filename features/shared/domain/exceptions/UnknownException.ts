export class UnknownException extends Error {
	constructor(message?: string,) {
		super(message != null ? message : "unknown")
		this.name = "UnknownException"
	}
}
