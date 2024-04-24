export class InvalidRankException extends Error {
	constructor(message?: string) {
		super("InvalidRankException")
		this.name = "rank"
	}
}
