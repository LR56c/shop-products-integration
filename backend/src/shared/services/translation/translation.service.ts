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
		let obj: Translation = {}
		errors.forEach( ( error ) => {
			obj[`${ error.message }`] = this.i18nTranslation( error )
		} )
		return obj
	}

	i18nTranslation( error: BaseException ): string {
		if ( error.field != undefined && error.value != undefined ) {
			return this.i18n!.translate( `main.${ error.message }`, {
				args: {
					value: error.value,
					field: error.field
				}
			} )
		}
		else if ( error.field != undefined ) {
			return this.i18n!.translate( `main.${ error.message }`, {
				args: {
					field: error.field
				}
			} )
		}
		else if ( error.value != undefined ) {
			return this.i18n!.translate( `main.${ error.message }`, {
				args: {
					value: error.value
				}
			} )
		}
		else {
			return this.i18n!.translate( `main.${ error.message }` )
		}
	}
}