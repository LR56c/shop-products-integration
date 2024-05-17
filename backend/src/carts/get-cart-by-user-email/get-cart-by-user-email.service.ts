import { Injectable } from '@nestjs/common';
import { CartRepository } from '~features/carts/domain/cart_repository'
import {GetCartByUserEmail} from "~features/carts/application/get_cart_by_user_email";
import {
	CartProductResponse,
} from '~features/carts/domain/cart_response'

@Injectable()
export class GetCartByUserEmailService {
	constructor( private readonly repo: CartRepository ) {}

	public getCartByUserEmail(email : string): Promise<CartProductResponse[]> {
		return GetCartByUserEmail(this.repo, { email })
	}
}
