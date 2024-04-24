export class InvalidIntegerException extends Error {
	constructor(message?: string) {
		super(message != null ? message : "integer")
		this.name = "InvalidIntegerException"
	}
}
