/**
 * Flattens error messages from an array of errors strings
 * @returns {undefined} - if errors is not a type of error, returns array of undefined
 */
export function flatErrors( errors: unknown ): string[] {
	if ( Array.isArray( errors ) ) {
		return errors.map( ( error ) => error.message )
	}
	return [ ( errors as Error ).message ]
}
