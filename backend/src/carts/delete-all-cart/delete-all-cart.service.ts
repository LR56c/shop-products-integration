import { Injectable } from '@nestjs/common';
import { CartRepository } from '~features/carts/domain/cart_repository'
import { Email } from '~features/shared/domain/value_objects/Email'

@Injectable()
export class DeleteAllCartService {
	constructor( private readonly repo: CartRepository ) {}

	public deleteAllCart(email : Email): Promise<boolean> {
		return this.repo.removeAll(email)
	}
}
