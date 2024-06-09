import { Injectable } from '@nestjs/common'
import { ShopAddress } from 'packages/shop-address/domain/shop-address'
import { ShopAddressRepository } from 'packages/shop-address/domain/shop-address-repository'

@Injectable()
export class CreateShopAddressService {

	constructor( private readonly repo: ShopAddressRepository ) {}

	async createShopAddress( shopAddress: ShopAddress ): Promise<boolean> {
		return this.repo.createShopAddress( shopAddress )
	}
}
