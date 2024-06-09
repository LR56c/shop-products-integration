import { Injectable } from '@nestjs/common'
import { CartDto } from 'src/carts/dto/cart_dto'
import { UpsertCart } from 'packages/carts/application/upsert_cart'
import { CartRepository } from 'packages/carts/domain/cart_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class UpsertCartService {
	constructor( private readonly repo: CartRepository ) {}

	async upsertCart( dto: CartDto ): Promise<boolean> {
		const result = await UpsertCart( this.repo, {
			user_email: dto.user_email,
			product_id: dto.product_id,
			quantity  : dto.quantity
		} )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
