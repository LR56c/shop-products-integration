import { Injectable } from '@nestjs/common';
import { Promotion } from '~features/promotions/domain/promotion'
import { PromotionRepository } from '~features/promotions/domain/promotion_repository'

@Injectable()
export class CreatePromotionService {
	constructor( private readonly repo: PromotionRepository ) {}

	async execute( promotion: Promotion ): Promise<boolean> {
		return this.repo.add(promotion)
	}
}
