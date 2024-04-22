export class InvalidDateException extends Error {
	constructor(message?: string) {
		super("InvalidDateException")
		this.name = "date"
	}
}
