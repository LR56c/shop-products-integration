export class EmailException extends Error {
	constructor(message?: string) {
		super(message != null ? message : "email")
		this.name = "EmailException"
	}
}
