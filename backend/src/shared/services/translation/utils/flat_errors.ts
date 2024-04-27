import { BaseException } from '~features/shared/domain/exceptions/BaseException'

/**
 * Flattens error messages from an array of errors strings
 * @returns {undefined} - if errors is not a type of error, returns array of undefined
 */
export interface FlatErrors {
	token: string,
	type: string
}

export function flatErrors( errors: BaseException[] ): Map<string, FlatErrors>
{
	const map = new Map<string, FlatErrors>()
	errors.map( ( error ) => {
		map.set( error.message, {
			'token': error.message,
			'type' : error.rawValue ?? 'undefined'
		} )
	} )
	return map
}
