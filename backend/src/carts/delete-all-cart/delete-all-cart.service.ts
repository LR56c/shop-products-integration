import { Injectable } from '@nestjs/common';
import { CartRepository } from '~features/carts/domain/cart_repository'
import {DeleteAllCart} from "~features/carts/application/delete_all_cart";

@Injectable()
export class DeleteAllCartService {
	constructor( private readonly repo: CartRepository ) {}

	public deleteAllCart(email : string): Promise<boolean> {
		return DeleteAllCart(this.repo, email)
	}
}
