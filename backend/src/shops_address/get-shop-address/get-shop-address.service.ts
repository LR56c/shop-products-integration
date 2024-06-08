import { Injectable } from '@nestjs/common'
import { ValidInteger } from '~features/shared/domain/value_objects/valid_integer'
import { ValidString } from '~features/shared/domain/value_objects/valid_string'
import { ShopAddress } from '~features/shop-address/domain/shop-address'
import { ShopAddressRepository } from '~features/shop-address/domain/shop-address-repository'

@Injectable()
export class GetShopAddressService {
	constructor( private readonly repo: ShopAddressRepository ) {}

	async getShopAddress( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<ShopAddress[]> {
		return this.repo.getShopAddress( from, to, name )
	}
}
