import { Injectable } from '@nestjs/common'
import { GetSale } from 'packages/discount_type/features/sales/application/get_sale'
import { Sale } from 'packages/discount_type/features/sales/domain/sale'
import { SaleRepository } from 'packages/discount_type/features/sales/domain/sale_repository'
import { Errors } from 'packages/shared/domain/exceptions/errors'

@Injectable()
export class GetSaleService {
	constructor( private readonly repo: SaleRepository ) {}

	async getSale( id: string ): Promise<Sale> {
		const result = await GetSale( this.repo, id )

		if ( result instanceof Errors ) {
			throw [ ...result.values ]
		}

		return result
	}
}
