import { BaseException } from 'packages/shared/domain/exceptions/BaseException'
import { Errors } from 'packages/shared/domain/exceptions/errors'
import { InvalidStringException } from 'packages/shared/domain/exceptions/InvalidStringException'
import { ValidInteger } from 'packages/shared/domain/value_objects/valid_integer'
import { ValidString } from 'packages/shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeDefault,
	wrapTypeErrors
} from 'packages/shared/utils/wrap_type'
import { ShopAddress } from 'packages/shop-address/domain/shop-address'
import { ShopAddressRepository } from 'packages/shop-address/domain/shop-address-repository'

export const GetAllShopAddress = async ( repo: ShopAddressRepository, props: {
	from: number,
	to: number,
	name?: string
} ): Promise<ShopAddress[] | Errors> => {

	const errors: BaseException[] = []

	const nameResult = wrapTypeDefault(
		undefined,
		( value ) => ValidString.from( value ),
		props.name
	)

	if ( nameResult instanceof BaseException ) {
		errors.push( new InvalidStringException( 'name' ) )
	}

	const fromResult = wrapType<ValidInteger, BaseException>(
		() => ValidInteger.from( props.from )
	)

	if ( fromResult instanceof BaseException ) {
		errors.push( fromResult )
	}

	const toResult = wrapType<ValidInteger, BaseException>(
		() => ValidInteger.from( props.to )
	)

	if ( toResult instanceof BaseException ) {
		errors.push( toResult )
	}

	if ( errors.length > 0 ) {
		return new Errors( errors )
	}


	return await wrapTypeErrors( () => repo.getAll(
		fromResult as ValidInteger,
		toResult as ValidInteger,
		nameResult as ValidString
	) )
}
