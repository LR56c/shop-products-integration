/**
 * Flattens error messages from an array of errors strings
 * @returns {undefined} - if errors is not a type of error, returns array of undefined
 */
export interface FlatErrors{
	token: string
}

export function flatErrors( errors: unknown ): FlatErrors[]
{
	if ( Array.isArray( errors ) ) {
		errors.map( ( error ) => {
			if ( error instanceof Error ) {
				return {
					token  : error.name
				}
			}
			return {
				token: 'unknown'
			}
		} )
	}

	if ( errors instanceof Error ) {
		return [ {
			token  : errors.name
		} ]
	}
	return [
		{
			token: 'unknown'
		}
	]
}
