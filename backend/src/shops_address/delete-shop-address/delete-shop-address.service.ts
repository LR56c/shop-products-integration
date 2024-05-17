import { Injectable } from '@nestjs/common'
import { ShopAddress } from '~features/shop-address/domain/shop-address'
import { ShopAddressRepository } from '~features/shop-address/domain/shop-address-repository'

@Injectable()
export class DeleteShopAddressService {
	constructor( private readonly repo: ShopAddressRepository ) {}

	async deleteShopAddress( shopAddress: ShopAddress ): Promise<boolean> {
		return this.repo.deleteShopAddress( shopAddress )
	}
}
