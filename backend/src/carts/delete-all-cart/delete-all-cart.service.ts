import { Injectable } from '@nestjs/common'
import { DeleteAllCart } from '~features/carts/application/delete_all_cart'
import { CartRepository } from '~features/carts/domain/cart_repository'

@Injectable()
export class DeleteAllCartService {
	constructor( private readonly repo: CartRepository ) {}

	public deleteAllCart( email: string ): Promise<boolean> {
		return DeleteAllCart( this.repo, email )
	}
}
