import { z } from 'zod'
import { InvalidRUTException } from '../exceptions/InvalidRUTException'

export const RUTSchema = z.string( {
	message: 'Ingrese un RUT válido'
} )
                          .superRefine( ( arg, ctx ) => {
	                          if ( !arg.match(
			                          RegExp( /\b[0-9|.]{1,10}-{1}[K|k|0-9]{1}$/ ) ) ||
		                          !verify_id( arg ) )
	                          {
		                          ctx.addIssue( {
			                          code   : z.ZodIssueCode.custom,
			                          message: 'Ingrese un RUT válido'
		                          } )
	                          }
	                          return arg
                          } )

export class RUT {
	readonly value: string

	private constructor( value: string ) {
		this.value = value
	}

	/**
	 * Create an RUT instance
	 * @throws {InvalidRUTException} - if string is invalid
	 */
	static from( value: string ): RUT {
		const parseValue = RUTSchema.safeParse( value )
		if ( !parseValue.success ) {
			throw new InvalidRUTException()
		}

		return new RUT( parseValue.data )
	}
}

function verify_id_digits( rut: string ): string {
	let clean_id = rut.replaceAll( '.', '' )
	                  .replaceAll( '-', '' )
	let body     = clean_id.substring( 0, clean_id.length - 1 )
	let add      = 0
	let multiple = 2

	for ( let i = body.length - 1; i >= 0; i-- ) {
		add += parseInt( body[i] ) * multiple
		multiple = multiple == 7 ? 2 : multiple + 1
	}

	let mod = 11 - ( add % 11 )

	if ( mod == 11 ) {
		return '0'
	}
	else if ( mod == 10 ) {
		return 'K'
	}
	else {
		return mod.toString()
	}
}

function verify_id( rut: string ): boolean {
	let digits       = rut.substring( rut.length - 1 )
	                      .toUpperCase()
	let verify_digit = verify_id_digits( rut )

	return digits == verify_digit
}
