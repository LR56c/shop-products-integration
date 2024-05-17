export abstract class BaseException extends Error {
	protected constructor(
		message?: string,
		readonly value?: string,
		readonly field?: string
	)
	{
		super( message != null ? message : 'invalid.undefined' )
		this.name = 'BaseException'
	}
}
