export class InvalidRankException extends Error {
	constructor(message?: string) {
		super(message != null ? message : "rank")
		this.name = "InvalidRankException"
	}
}
