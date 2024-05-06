import { Injectable } from '@nestjs/common'
import { OrderConfirmed } from '~features/order_confirmed/domain/order_confirmed'
import { OrderConfirmedRepository } from '~features/order_confirmed/domain/order_confirmed_repository'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'

@Injectable()
export class GetAllOrderConfirmedService {
	constructor( private readonly repo: OrderConfirmedRepository ) {}

	async execute( from: ValidInteger,
		to: ValidInteger ): Promise<OrderConfirmed[]> {
		return this.repo.getAll( from, to )
	}
}
