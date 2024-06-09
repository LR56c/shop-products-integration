import { Injectable } from '@nestjs/common'
import { ValidInteger } from 'packages/shared/domain/value_objects/valid_integer'
import { ValidString } from 'packages/shared/domain/value_objects/valid_string'
import { ShopAddress } from 'packages/shop-address/domain/shop-address'
import { ShopAddressRepository } from 'packages/shop-address/domain/shop-address-repository'

@Injectable()
export class GetShopAddressService {
	constructor( private readonly repo: ShopAddressRepository ) {}

	async getShopAddress( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<ShopAddress[]> {
		return this.repo.getShopAddress( from, to, name )
	}
}
