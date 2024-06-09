import { Injectable } from '@nestjs/common'
import { DeleteCart } from 'packages/carts/application/delete_cart'
import { CartRepository } from 'packages/carts/domain/cart_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'

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
