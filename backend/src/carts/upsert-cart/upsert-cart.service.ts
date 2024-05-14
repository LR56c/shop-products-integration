import { Injectable } from '@nestjs/common'
import { UpsertCart } from '~features/carts/application/upsert_cart'
import { CartRepository } from '~features/carts/domain/cart_repository'

@Injectable()
export class UpsertCartService {
	constructor( private readonly repo: CartRepository ) {}

	async upsertCart( user_email: string, product_id: string,
		quantity: number ): Promise<boolean> {
		return UpsertCart( this.repo, { user_email, product_id, quantity } )
	}
}
