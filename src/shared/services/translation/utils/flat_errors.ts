import { BaseException } from 'packages/shared/domain/exceptions/BaseException'

/**
 * Flattens error messages from an array of errors strings
 * @returns {undefined} - if errors is not a type of error, returns array of undefined
 */
export interface FlatErrors {
	token: string,
	field: string,
	type: string
}

export function flatErrors( errors: BaseException[] ): Map<string, FlatErrors>
{
	const map = new Map<string, FlatErrors>()
	errors.map( ( error ) => {
		map.set( error.message, {
			'token': error.message,
			'field': error.field ?? '',
			'type' : error.value ?? 'undefined'
		} )
	} )
	return map
}
