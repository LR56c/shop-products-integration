export class InvalidStringException extends Error {
	constructor(message?: string) {
		super("InvalidStringException")
		this.name = "string"
	}
}
