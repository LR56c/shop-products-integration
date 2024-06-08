import { Injectable } from '@nestjs/common'
import { GetCartByUserEmail } from '~features/carts/application/get_cart_by_user_email'
import { CartRepository } from '~features/carts/domain/cart_repository'
import { CartProductResponse } from '~features/carts/domain/cart_response'
import { Errors } from '~features/shared/domain/exceptions/errors'

@Injectable()
export class GetCartByUserEmailService {
	constructor( private readonly repo: CartRepository ) {}

	async getCartByUserEmail( email: string ): Promise<CartProductResponse[]> {
		const result = await GetCartByUserEmail( this.repo, { email } )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}
		return result
	}
}
