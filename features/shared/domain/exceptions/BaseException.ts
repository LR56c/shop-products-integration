export abstract class BaseException extends Error {
	protected constructor(
		message?: string,
		readonly rawValue?: string
	) {
		super(message != null ? message : "unknown")
		this.name = "BaseException"
	}
}
