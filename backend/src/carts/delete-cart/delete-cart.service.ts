import { Injectable } from '@nestjs/common'
import { CartRepository } from '~features/carts/domain/cart_repository'
import { Email } from '~features/shared/domain/value_objects/Email'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class DeleteCartService {
	constructor( private readonly repo: CartRepository ) {}

	public deleteCart( email: Email, product_id: UUID ): Promise<boolean> {
		return this.repo.remove( email, product_id )
	}
}
