import { PromotionResponse } from '../domain/promotion_response'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidIntegerException } from '../../../../shared/domain/exceptions/InvalidIntegerException'
import { wrapType } from '../../../../shared/utils/WrapType'
import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'
import { PromotionProduct } from '../domain/promotion'
import { PromotionRepository } from '../domain/promotion_repository'

//TODO: como mejora, se podria agregar category a promotionProduct que llegan, y a clase discount, para comparar solo los productos de la misma categoria
export const GetDiscountPromotions = async ( repo: PromotionRepository,
	products_map: Map<string, PromotionProduct>, props: {
		from: number,
		to: number,
	} ): Promise<PromotionResponse[]> => {

	const errors: BaseException[] = []

	const fromResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.from ) )

	if ( fromResult instanceof BaseException ) {
		errors.push( fromResult )
	}

	const toResult = wrapType<ValidInteger, InvalidIntegerException>(
		() => ValidInteger.from( props.to ) )

	if ( toResult instanceof BaseException ) {
		errors.push( toResult )
	}

	if ( errors.length > 0 ) {
		throw errors
	}

	const databasePromotions = await repo.getAll( fromResult as ValidInteger,
		toResult as ValidInteger )

	const promotions: PromotionResponse[] = []

	for ( const db_promotion of databasePromotions ) {
		const totalProductsCount = databasePromotions.length
		let validProductCount    = 0
		for ( const db_product of db_promotion.products ) {
			if ( products_map.has( db_product.product.id.value ) ) {
				console.log( 'discount item exist' )
				const paramProduct = products_map.get( db_product.product.id.value )!

				if ( paramProduct.quantity.value >= db_product.quantity.value ) {
					let remaining = paramProduct.quantity.value -
						db_product.quantity.value
					// param 2 <= db 1
					if ( remaining <= 0 ) {
						for ( const pend of db_promotion.products ) {
							products_map.delete( pend.product.id.value )
						}
						promotions.push( db_promotion )
					}
					else {
						const newProduct = new PromotionProduct( ValidInteger.from(remaining), paramProduct.product )
						products_map.set( paramProduct.product.value, newProduct)
					}
					validProductCount++
				}
				else {
					// si no tiene la cantidad suficiente, se salta la promocion
					console.log( 'discount item insufficient' )
					break
				}

				validProductCount++
			}
			else {
				//si no tiene el producto, se salta la promocion
				console.log( 'discount skip' )
				break
			}
			//si validCount es igual que totalCount, quiere decir que se completo la promocion
			if ( validProductCount === totalProductsCount ) {
				//se elimina de la lista de productos
				for ( const pend of db_promotion.products ) {
					products_map.delete( pend.product.id.value )
				}
				promotions.push( db_promotion )
			}
		}
	}
	return promotions
}
