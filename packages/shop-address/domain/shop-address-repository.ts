import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { ShopAddress } from './shop-address'

export abstract class ShopAddressRepository {
	abstract createShopAddress( shopAddress: ShopAddress ): Promise<boolean>

	abstract deleteShopAddress( shopAddress: ShopAddress ): Promise<boolean>

	abstract getShopAddress( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<ShopAddress[]>
}
