import { Injectable } from '@nestjs/common'
import { CartRepository } from '~features/carts/domain/cart_repository'
import { Email } from '~features/shared/domain/value_objects/Email'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import {DeleteCart} from "~features/carts/application/delete_cart";

@Injectable()
export class DeleteCartService {
	constructor( private readonly repo: CartRepository ) {}

	public deleteCart( email: string, product_id: string ): Promise<boolean> {
		return DeleteCart(this.repo, email, product_id)
	}
}
