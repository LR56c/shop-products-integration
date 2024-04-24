export class InvalidURLException extends Error {
	constructor(message?: string) {
		super(message != null ? message : "url")
		this.name = "InvalidURLException"
	}
}
