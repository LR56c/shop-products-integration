import { Injectable } from '@nestjs/common'
import { GetCartByUserEmail } from 'packages/carts/application/get_cart_by_user_email'
import { CartRepository } from 'packages/carts/domain/cart_repository'
import { CartProductResponse } from 'packages/carts/domain/cart_response'
import { Errors } from 'packages/shared/domain/exceptions/errors'

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
