import { Injectable } from '@nestjs/common'
import { Sale } from 'packages/discount_type/features/sales/domain/sale'
import { SaleRepository } from 'packages/discount_type/features/sales/domain/sale_repository'
import { UUID } from 'packages/shared/domain/value_objects/uuid'

@Injectable()
export class GetSaleService {
	constructor( private readonly repo: SaleRepository ) {}

	async getSale( id: UUID ): Promise<Sale> {
		return this.repo.getByID( id )
	}
}
