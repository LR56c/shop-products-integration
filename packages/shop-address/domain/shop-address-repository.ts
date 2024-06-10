import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { ShopAddress } from './shop-address'

export abstract class ShopAddressRepository {
	abstract create( shopAddress: ShopAddress ): Promise<boolean>

	abstract delete( name: ValidString ): Promise<boolean>

	abstract getAll( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<ShopAddress[]>
}
