import { Injectable } from '@nestjs/common'
import { DeleteAllCart } from '../../../packages/carts/application/delete_all_cart'
import { CartRepository } from '../../../packages/carts/domain/cart_repository'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'

@Injectable()
export class DeleteAllCartService {
	constructor( private readonly repo: CartRepository ) {}

	async deleteAllCart( email: string ): Promise<boolean> {
		const result = await DeleteAllCart( this.repo, email )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
