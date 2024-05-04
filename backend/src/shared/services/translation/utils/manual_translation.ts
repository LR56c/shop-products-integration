import { FlatErrors } from './flat_errors'
import { Translation } from './translation_model'

export function manualTranslation( tokens: Map<string, FlatErrors> ): Translation {
	let obj: Translation = {}
	console.log( 'tokens' )
	console.log( tokens )
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
		else if ( tokens.has( 'infrastructure.limit_is_not_in_range' ) ) {
			obj[`${ key }`] = 'El límite no está en el rango permitido'
		}
		else if ( tokens.has( 'infrastructure.parameter_not_match' ) ) {
			obj[`${ key }`] = `El parámetro ${ value.field.length > 0 ? `'`+value.field + `' ` : `` }no coincide con el esperado`
		}
		else if ( tokens.has( 'invalid.string' ) ) {
			obj[`${ value.field.length > 0 ? value.field : key }`] =
				`El campo ${ value.field.length > 0 ? `'`+value.field + `' ` : `` }no es una cadena válida`
		}
		else if ( tokens.has( 'invalid.integer' ) ) {
			obj[`${ value.field.length > 0 ? value.field : key }`] =
				`El campo ${ value.field.length > 0 ? `'`+value.field + `' ` : `` }no es un entero válido`
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
