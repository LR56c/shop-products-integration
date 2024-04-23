export class InvalidRUTException extends Error {
	constructor(message?: string) {
		super("InvalidRUTException")
		this.name = "rut"
	}
}
