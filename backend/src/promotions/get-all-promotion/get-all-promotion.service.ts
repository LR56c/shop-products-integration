import { Injectable } from '@nestjs/common'
import { Promotion } from '~features/promotions/domain/promotion'
import { PromotionRepository } from '~features/promotions/domain/promotion_repository'
import { ValidDate } from '~features/shared/domain/value_objects/ValidDate'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { ValidString } from '~features/shared/domain/value_objects/ValidString'

@Injectable()
export class GetAllPromotionService {
	constructor( private readonly repo: PromotionRepository ) {}

	async execute( from: ValidInteger, to: ValidInteger, name?: ValidString,
		from_date?: ValidDate, to_date?: ValidDate ): Promise<Promotion[]> {
		return this.repo.getAll( from, to, name, from_date, to_date )
	}
}
