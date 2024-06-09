import { z } from 'zod'
import { PaymentMethodException } from '../exceptions/PaymentMethodException'

export enum PaymentMethodEnum {
	transfer = 'TRANSFER',
	debt     = 'DEBT',
	credit   = 'CREDIT',
}

export class PaymentMethod {

	readonly value: PaymentMethodEnum

	private constructor( value: PaymentMethodEnum ) {
		this.value = value
	}

	static from( value: string ): PaymentMethod {
		const result = z.nativeEnum( PaymentMethodEnum )
		                .safeParse( value )
		if ( result.success === false ) {
			throw new PaymentMethodException()
		}
		return new PaymentMethod( result.data )
	}
}
