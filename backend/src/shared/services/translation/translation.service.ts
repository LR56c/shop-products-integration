import { Injectable } from '@nestjs/common'
import { I18nService } from 'nestjs-i18n'
import { flatErrors } from './utils/flat_errors'
import { manualTranslation } from './utils/manual_translation'

import { Translation } from './utils/translation_model'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'

@Injectable()
export class TranslationService {
	constructor( private readonly i18n ?: I18nService ) {}

	translateAll( errors: BaseException[] ): Translation {
		if ( this.i18n == null ) {
			console.log( 'manual translate' )
			return manualTranslation( flatErrors( errors ) )
		}

		console.log( 'i18n translate' )
		//TODO: revisar palabras compuestas? ej: cada error tiene un msg por lo que deberia utilizarse para formar: "'variable' no es un numero"
		// reconociendo el error base, pero agregando en caso que se necesite especificar, la traduccion de la 'variable
		let obj: Translation = {}
		errors.forEach( ( error ) => {
			if ( error.rawValue != null ) {
				obj[`${ error.message }`] =
					this.i18n!.translate( `main.${ error.message }`, {
						args: {
							value: error.rawValue
						}
					} )
			}
			obj[`${ error.message }`] =
				this.i18n!.translate( `main.${ error.message }` )
		} )
		return obj
	}
}
