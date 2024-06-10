import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { Errors } from '../../shared/domain/exceptions/errors'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import {
	wrapType,
	wrapTypeErrors
} from '../../shared/utils/wrap_type'
import { ShopAddress } from '../domain/shop-address'
import { ShopAddressRepository } from '../domain/shop-address-repository'

export const CreateShopAddress = async ( repo: ShopAddressRepository, props: {
	name: string
} ): Promise<boolean | Errors> => {

	const nameResult = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( props.name ) )

	if ( nameResult instanceof BaseException ) {
		return new Errors( [ new InvalidStringException( 'name' ) ] )
	}

	const s = new ShopAddress(
		nameResult as ValidString
	)

	return await wrapTypeErrors( () => repo.create( s ) )
}
