export class InvalidIntegerException extends Error {
	constructor(message?: string) {
		super("InvalidIntegerException")
		this.name = "integer"
	}
}
