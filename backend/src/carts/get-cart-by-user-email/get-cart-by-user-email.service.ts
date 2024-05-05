import { Injectable } from '@nestjs/common';
import { CartUser } from '~features/carts/domain/cart'
import { CartRepository } from '~features/carts/domain/cart_repository'
import { Email } from '~features/shared/domain/value_objects/Email'

@Injectable()
export class GetCartByUserEmailService {
	constructor( private readonly repo: CartRepository ) {}

	public getCartByUserEmail(email : Email): Promise<CartUser> {
		return this.repo.getByUserEmail(email)
	}
}
