import { Translation } from 'backend/src/shared/infrastructure/parseTranslation'

/**
 * Flattens error messages from an array of errors strings
 * @returns {undefined} - if errors is not a type of error, returns array of undefined
 */
export interface FlatErrors {
	token: string
}

//TODO: combinar flat & parse erro, y crear otro flat con i18n
export function flatErrors( errors: unknown ): Map<string, Translation>
{
	const map = new Map<string, Translation>()
	if ( Array.isArray( errors ) ) {

		errors.map( ( error ) => {
			if ( error instanceof Error ) {
				map.set( error.message, {
					'token': error.message
				} )
			}
			else {
				map.set( 'unknown', {
					'token': 'unknown'
				} )
			}
		} )
	}

	if ( errors instanceof Error ) {
		map.set( errors.message, {
			'token': errors.message
		} )
	}
	else {
		map.set( 'unknown', {
			'token': 'unknown'
		} )
	}
	return map
}
