export class InvalidULIDException extends Error {
	constructor(message?: string) {
		super("InvalidULIDException")
		this.name = "ulid"
	}
}
