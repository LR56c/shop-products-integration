import { Injectable } from '@nestjs/common'
import { OrderConfirmedRepository } from 'packages/order_confirmed/domain/order_confirmed_repository'
import { UUID } from 'packages/shared/domain/value_objects/uuid'
import {DeleteOrderConfirmed} from "packages/order_confirmed/application/delete_order_confirmed";

@Injectable()
export class DeleteOrderConfirmedService {
	constructor( private readonly repo: OrderConfirmedRepository ) {}

	async execute( id: string ): Promise<boolean> {
		return DeleteOrderConfirmed( this.repo, id )
	}
}
