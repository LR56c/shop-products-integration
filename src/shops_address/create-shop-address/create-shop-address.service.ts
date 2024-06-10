import { Injectable } from '@nestjs/common'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'
import { CreateShopAddress } from '../../../packages/shop-address/application/create_shop_address'
import { ShopAddressRepository } from '../../../packages/shop-address/domain/shop-address-repository'

@Injectable()
export class CreateShopAddressService {

	constructor( private readonly repo: ShopAddressRepository ) {}

	async createShopAddress( shopAddress: string ): Promise<boolean> {
		const result = await CreateShopAddress( this.repo, {
			name: shopAddress
		} )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
