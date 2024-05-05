import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../shared/utils/WrapType'
import { ShopAddress } from '../domain/shop-address'

export function shopAddressToJson( shopAddress: ShopAddress ): Record<string, any> {
	return {
		name: shopAddress.name.value
	}
}

export function shopAddressFromJson( json: Record<string, any> ): ShopAddress | BaseException {

	const name = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.name ) )

	if ( name instanceof BaseException ) {
		throw new InvalidStringException( 'name' )
	}

	return new ShopAddress(
		name as ValidString
	)
}
