import { Injectable } from '@nestjs/common';
import { Sale } from '~features/discount_type/features/sales/domain/sale'
import { SaleRepository } from '~features/discount_type/features/sales/domain/sale_repository'
import { ValidDate } from '~features/shared/domain/value_objects/ValidDate'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'

@Injectable()
export class GetAllSaleService {
	constructor(private readonly repo : SaleRepository) {}

	async getAll( from: ValidInteger, to: ValidInteger, from_date?: ValidDate, to_date?: ValidDate ): Promise<Sale[]> {
		return this.repo.getAll( from, to, from_date, to_date )
	}
}
