export class InvalidDecimalException extends Error {
	constructor(message?: string) {
		super("InvalidDecimalException")
		this.name = "decimal"
	}
}
