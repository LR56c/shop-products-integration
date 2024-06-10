import { Injectable } from '@nestjs/common'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'
import { GetAllShopAddress } from '../../../packages/shop-address/application/get_all_shop_address'
import { ShopAddress } from '../../../packages/shop-address/domain/shop-address'
import { ShopAddressRepository } from '../../../packages/shop-address/domain/shop-address-repository'

@Injectable()
export class GetShopAddressService {
	constructor( private readonly repo: ShopAddressRepository ) {}

	async getShopAddress(
		from: number,
		to: number,
		name?: string ): Promise<ShopAddress[]> {
		const result = await GetAllShopAddress( this.repo, {
			from: from,
			to  : to,
			name: name
		} )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
