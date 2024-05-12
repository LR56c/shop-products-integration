import { Injectable } from '@nestjs/common';
import { Promotion } from '~features/discount_type/features/promotions/domain/promotion'
import { PromotionRepository } from '~features/discount_type/features/promotions/domain/promotion_repository'
import { UUID } from '~features/shared/domain/value_objects/UUID'

@Injectable()
export class GetPromotionService {
	constructor( private readonly repo: PromotionRepository ) {}

	async execute( id: UUID ): Promise<Promotion> {
		return await this.repo.getByID( id ) as Promotion
	}
}
