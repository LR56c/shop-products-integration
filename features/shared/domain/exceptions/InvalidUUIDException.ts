export class InvalidUUIDException extends Error {
	constructor(message?: string) {
		super(message != null ? message : "uuid")
		this.name = "InvalidUUIDException"
	}
}
