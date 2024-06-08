import { Injectable } from '@nestjs/common'
import { DeleteCart } from '~features/carts/application/delete_cart'
import { CartRepository } from '~features/carts/domain/cart_repository'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class DeleteCartService {
	constructor( private readonly repo: CartRepository ) {}

	async deleteCart( email: string, product_id: string ): Promise<boolean> {
		const result = await DeleteCart( this.repo, email, product_id )

		if ( result instanceof Errors ) {
			throw [...result.values]
		}

		return result
	}
}
