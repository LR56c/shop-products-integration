import { Injectable } from '@nestjs/common'
import { OrderConfirmedRepository } from '~features/order_confirmed/domain/order_confirmed_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class DeleteOrderConfirmedService {
	constructor( private readonly repo: OrderConfirmedRepository ) {}

	async execute( id: UUID ): Promise<boolean> {
		return this.repo.delete( id )
	}
}
