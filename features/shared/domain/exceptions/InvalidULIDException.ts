export class InvalidULIDException extends Error {
	constructor(message?: string) {
		super(message != null ? message : "ulid")
		this.name = "InvalidULIDException"
	}
}
