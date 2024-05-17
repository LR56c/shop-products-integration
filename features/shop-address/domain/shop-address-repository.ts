import { ValidInteger } from 'features/shared/domain/value_objects/ValidInteger'
import { ValidString } from 'features/shared/domain/value_objects/ValidString'
import { ShopAddress } from './shop-address'

export abstract class ShopAddressRepository {
	abstract createShopAddress( shopAddress: ShopAddress ): Promise<boolean>

	abstract deleteShopAddress( shopAddress: ShopAddress ): Promise<boolean>

	abstract getShopAddress( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<ShopAddress[]>
}
