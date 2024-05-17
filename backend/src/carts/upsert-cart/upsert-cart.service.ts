import { Injectable } from '@nestjs/common'
import { CartDto } from 'src/carts/dto/cart_dto'
import { UpsertCart } from '~features/carts/application/upsert_cart'
import { CartRepository } from '~features/carts/domain/cart_repository'

@Injectable()
export class UpsertCartService {
	constructor( private readonly repo: CartRepository ) {}

	async upsertCart( dto: CartDto ): Promise<boolean> {
		return UpsertCart( this.repo, {
			user_email: dto.user_email,
			product_id: dto.product_id,
			quantity  : dto.quantity
		} )
	}
}
