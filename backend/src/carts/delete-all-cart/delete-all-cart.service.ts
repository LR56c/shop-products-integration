import { Injectable } from '@nestjs/common'
import { DeleteAllCart } from '~features/carts/application/delete_all_cart'
import { CartRepository } from '~features/carts/domain/cart_repository'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'

@Injectable()
export class DeleteAllCartService {
	constructor( private readonly repo: CartRepository ) {}

	async deleteAllCart( email: string ): Promise<boolean> {
		const result = await DeleteAllCart( this.repo, email )

		if ( result instanceof BaseException ) {
			throw [result]
		}

		return result
	}
}
