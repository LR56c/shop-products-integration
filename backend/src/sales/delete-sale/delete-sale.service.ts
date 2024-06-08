import { Injectable } from '@nestjs/common'
import { DiscountRepository } from '~features/discount_type/domain/discount_repository'
import { UUID } from '~features/shared/domain/value_objects/uuid'

@Injectable()
export class DeleteSaleService {
	constructor(
		private readonly repo: DiscountRepository
	)
	{}

	async deleteSale( id: UUID ): Promise<boolean> {
		return this.repo.remove( id )
	}
}
