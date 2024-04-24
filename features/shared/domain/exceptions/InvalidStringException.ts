export class InvalidStringException extends Error {
	constructor(message?: string) {
			super(message != null ? message : "string")
			this.name = "InvalidStringException"
	}
}
