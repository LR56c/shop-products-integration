import { Injectable } from '@nestjs/common'
import { DeleteCart } from '~features/carts/application/delete_cart'
import { CartRepository } from '~features/carts/domain/cart_repository'

@Injectable()
export class DeleteCartService {
	constructor( private readonly repo: CartRepository ) {}

	public deleteCart( email: string, product_id: string ): Promise<boolean> {
		return DeleteCart( this.repo, email, product_id )
	}
}
