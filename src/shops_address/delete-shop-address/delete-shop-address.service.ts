import { Injectable } from '@nestjs/common'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'
import { DeleteShopAddress } from '../../../packages/shop-address/application/delete_shop_address'
import { ShopAddressRepository } from '../../../packages/shop-address/domain/shop-address-repository'

@Injectable()
export class DeleteShopAddressService {
	constructor( private readonly repo: ShopAddressRepository ) {}

	async deleteShopAddress( shopAddress: string ): Promise<boolean> {
		const result = await DeleteShopAddress( this.repo, {
			name: shopAddress
		} )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
