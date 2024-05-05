import { Injectable } from '@nestjs/common';
import { CartRepository } from '~features/carts/domain/cart_repository'
import { Email } from '~features/shared/domain/value_objects/Email'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'

@Injectable()
export class UpdateCartService {
	constructor( private readonly repo: CartRepository ) {}

	public updateCart( user_email : Email, product_id : UUID, quantity: ValidInteger  ): Promise<boolean> {
		return this.repo.update( user_email, product_id, quantity)
	}
}
