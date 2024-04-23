import { FlatErrors } from '~features/shared/utils/FlatErrors'

export interface Translation {
	[key: string]: string
}

export function parseTranslation( tokens: FlatErrors[] ):Translation {
	let obj: Translation = {}
	tokens.map( ( entry ) => {
		switch ( entry.token ) {
			default:
				obj[`${entry.token}`] = "Hubo un error desconocido"
				break
		}
	})
	return obj
}
