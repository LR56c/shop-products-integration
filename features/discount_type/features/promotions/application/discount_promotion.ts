import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'
import { PromotionRepository } from '../domain/promotion_repository'
import {
	PartialPromotionProduct,
	Promotion
} from '../domain/promotion'

export const GetDiscountPromotions = async ( repo: PromotionRepository,
	products_map: Map<string, PartialPromotionProduct> ): Promise<Promotion[]> => {
	const databasePromotions = await repo.getAll( ValidInteger.from( 0 ),
		ValidInteger.from( 1000 ) )

	const promotions : Promotion[] = []

	for ( const promotion of databasePromotions ) {
		const totalProductsCount = databasePromotions.length
		let validProductCount  = 0
		for ( const product of promotion.products ) {
			if ( products_map.has( product.product.id.value ) ) {
				validProductCount++
			}
			//si validCount es igual que totalCount, quiere decir que se completo la promocion
			if( validProductCount === totalProductsCount ) {
				//se elimina de la lista de productos
				for ( const pend of promotion.products ) {
					products_map.delete(pend.product.id.value)
				}
				promotions.push( promotion )
			}
		}
	}
	return promotions
}
