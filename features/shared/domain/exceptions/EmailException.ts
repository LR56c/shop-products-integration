export class EmailException extends Error {
	constructor(message?: string) {
		super("EmailException")
		this.name = "email"
	}
}
