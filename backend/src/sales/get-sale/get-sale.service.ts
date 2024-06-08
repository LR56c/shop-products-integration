import { Injectable } from '@nestjs/common'
import { Sale } from '~features/discount_type/features/sales/domain/sale'
import { SaleRepository } from '~features/discount_type/features/sales/domain/sale_repository'
import { UUID } from '~features/shared/domain/value_objects/uuid'

@Injectable()
export class GetSaleService {
	constructor( private readonly repo: SaleRepository ) {}

	async getSale( id: UUID ): Promise<Sale> {
		return this.repo.getByID( id )
	}
}
