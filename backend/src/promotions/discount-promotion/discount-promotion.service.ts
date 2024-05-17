import { Injectable } from '@nestjs/common'
import { GetDiscountPromotions } from '~features/discount_type/features/promotions/application/discount_promotion'
import { PromotionProduct } from '~features/discount_type/features/promotions/domain/promotion'
import { PromotionRepository } from '~features/discount_type/features/promotions/domain/promotion_repository'
import { PromotionResponse } from '~features/discount_type/features/promotions/domain/promotion_response'
import { BaseException } from '~features/shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '~features/shared/domain/exceptions/InvalidIntegerException'
import { InvalidUUIDException } from '~features/shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '~features/shared/domain/value_objects/UUID'
import { ValidInteger } from '~features/shared/domain/value_objects/ValidInteger'
import { wrapType } from '~features/shared/utils/WrapType'
import { DiscounDto } from '../shared/promotion_dto'

@Injectable()
export class DiscountPromotionService {
	constructor(
		private readonly repo: PromotionRepository
	)
	{}

	async execute( dto: DiscounDto ): Promise<PromotionResponse[]> {

		const errors: BaseException[] = []

		const products_map: Map<string, PromotionProduct> = new Map()

		for ( const p of dto.products ) {
			const idResult = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( p.product_id ) )

			if ( idResult instanceof BaseException ) {
				errors.push( new InvalidUUIDException() )
			}

			const q = wrapType<ValidInteger, InvalidIntegerException>(
				() => ValidInteger.from( p.quantity ) )

			if ( q instanceof BaseException ) {
				errors.push( new InvalidIntegerException() )
			}

			if ( errors.length > 0 ) {
				throw errors
			}

			const qq = q as ValidInteger
			const id = idResult as UUID
			products_map.set( id.value, new PromotionProduct(
				qq,
				id
			) )
		}
		return GetDiscountPromotions( this.repo, products_map, {
			from: 0,
			to  : 1000
		} )
	}
}
