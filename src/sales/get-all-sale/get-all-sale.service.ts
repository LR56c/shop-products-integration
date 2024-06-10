import { Injectable } from '@nestjs/common'
import { GetAllSales } from '../../../packages/discount_type/features/sales/application/get_all_sales'
import { Sale } from '../../../packages/discount_type/features/sales/domain/sale'
import { SaleRepository } from '../../../packages/discount_type/features/sales/domain/sale_repository'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'

@Injectable()
export class GetAllSaleService {
	constructor( private readonly repo: SaleRepository ) {}

	async getAll(
		from: number,
		to: number,
		from_date?: string,
		to_date?: string ): Promise<Sale[]> {
		const result = await GetAllSales( this.repo, {
			from     : from,
			to       : to,
			from_date: from_date,
			to_date  : to_date
		} )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
