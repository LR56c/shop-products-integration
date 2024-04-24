export interface Translation {
	[key: string]: string
}

export function parseTranslation( tokens: Map<string, Translation> ): Translation {
	let obj: Translation = {}
	tokens.forEach( ( value, key, map ) => {
		if ( tokens.has( 'password.uppercase' ) ) {
			obj[`${ key }`] = 'Contraseña debe contener al menos una mayúscula'
		}
		else if ( tokens.has( 'password.lowercase' ) ) {
			obj[`${ key }`] = 'Contraseña debe contener al menos una minúscula'
		}
		else if ( tokens.has( 'password.number' ) ) {
			obj[`${ key }`] = 'Contraseña debe contener al menos un número'
		}
		else if ( tokens.has( 'password.character' ) ) {
			obj[`${ key }`] = 'Contraseña debe contener al menos un caracter especial'
		}
		else if ( tokens.has( 'password.length' ) ) {
			obj[`${ key }`] = 'Contraseña debe contener al menos 8 caracteres'
		}
		else if ( tokens.has( 'unknown' ) ) {
			obj[`${ key }`] = 'Hubo un error desconocido'
		}
		else {
			obj['undefined'] = 'Hubo un error indefinido'
		}
	} )
	return obj
}
