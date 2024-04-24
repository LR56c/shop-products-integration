export class InvalidDecimalException extends Error {
	constructor(message?: string) {
		super(message != null ? message : "decimal")
		this.name = "InvalidDecimalException"
	}
}
