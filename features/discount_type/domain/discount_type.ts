import { InvalidDiscountTypeException } from './invalid_discount_type_exception'
import {z} from "zod";

export enum DiscountTypeEnum {
	SALE = 'SALE',
	PROMOTION = 'PROMOTION',
}

export class DiscountType {

	readonly value : DiscountTypeEnum

	private constructor(value : DiscountTypeEnum) {
		this.value = value
	}

	static from(value : string): DiscountType {
		const result =  z.nativeEnum( DiscountTypeEnum ).safeParse( value )
		if ( result.success === false ) {
			throw new InvalidDiscountTypeException()
		}
		return new DiscountType( result.data )
	}
}
