import { FlatErrors } from '~features/shared/utils/FlatErrors'

export interface Translation {
	[key: string]: string
}

export function parseTranslation( tokens: FlatErrors[] ): Translation {
	let obj: Translation = {}
	tokens.map( ( entry ) => {
		switch ( entry.token ) {
			case 'password.uppercase':
				obj[`${ entry.token }`] = 'Contraseña debe contener al menos una mayúscula'
				break
			case 'password.uppercase':
				obj[`${ entry.token }`] = 'Contraseña debe contener al menos una minúscula'
				break
			case 'password.character':
				obj[`${ entry.token }`] = 'Contraseña debe contener al menos un caracter especial'
				break
			case 'password.length':
				obj[`${ entry.token }`] = 'Contraseña debe contener al menos 8 caracteres'
				break
			default:
				obj[`${ entry.token }`] = 'Hubo un error desconocido'
				break
		}
	} )
	return obj
}
