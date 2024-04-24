export class InvalidDateException extends Error {
	constructor(message?: string) {
		super(message != null ? message : "date")
		this.name = "InvalidDateException"
	}
}
