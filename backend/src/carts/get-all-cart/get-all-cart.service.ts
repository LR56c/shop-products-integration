import { Injectable } from '@nestjs/common';
import { Cart } from '~features/carts/domain/cart'
import { CartRepository } from '~features/carts/domain/cart_repository'
import { Email } from '~features/shared/domain/value_objects/Email'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'

@Injectable()
export class GetAllCartService {
	constructor( private readonly repo: CartRepository ) {}

	public getAllCart(from : ValidInteger, to: ValidInteger, email?:Email): Promise<Cart[]> {
		return this.repo.getAll(from, to, email)
	}
}
