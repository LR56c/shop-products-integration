import {
	productFromJson,
	productToJson
} from '../../../../products/application/product_mapper'
import { Product } from '../../../../products/domain/models/product'
import { BaseException } from '../../../../shared/domain/exceptions/BaseException'
import { InvalidDateException } from '../../../../shared/domain/exceptions/InvalidDateException'
import { InvalidIntegerException } from '../../../../shared/domain/exceptions/InvalidIntegerException'
import { InvalidPercentageException } from '../../../../shared/domain/exceptions/InvalidPercentageException'
import { InvalidStringException } from '../../../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../../../shared/domain/value_objects/ValidInteger'
import { ValidPercentage } from '../../../../shared/domain/value_objects/ValidPercentage'
import { ValidString } from '../../../../shared/domain/value_objects/ValidString'
import { wrapType } from '../../../../shared/utils/WrapType'
import {
	Promotion,
	PromotionProduct
} from '../domain/promotion'
import {
	PromotionProductResponse,
	PromotionResponse
} from '../domain/promotion_response'

export function promotionToJson( promotion: Promotion ): Record<string, any> {
	const jsonProducts = promotion.products.map( p => ( {
		quantity: p.quantity.value,
		product : p.product.value
	} ) )

	return {
		id        : promotion.id.value,
		name      : promotion.name.value,
		percentage: promotion.percentage.value,
		created_at: promotion.creation_date.value,
		end_date  : promotion.end_date.value,
		start_date: promotion.start_date.value,
		products  : jsonProducts
	}
}

export function promotionFromJson( json: Record<string, any> ): Promotion | BaseException[] {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	const percentage = wrapType<ValidPercentage, InvalidPercentageException>(
		() => ValidPercentage.from( json.percentage ) )

	if ( percentage instanceof BaseException ) {
		errors.push( new InvalidPercentageException( 'percentage' ) )
	}

	const creation_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.created_at ) )

	if ( creation_date instanceof BaseException ) {
		errors.push( new InvalidDateException( 'created_at' ) )
	}

	const start_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.start_date ) )

	if ( start_date instanceof BaseException ) {
		errors.push( new InvalidDateException( 'start_date' ) )
	}

	const end_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.end_date ) )

	if ( end_date instanceof BaseException ) {
		errors.push( new InvalidDateException( 'end_date' ) )
	}

	const name = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.name ) )

	if ( name instanceof BaseException ) {
		errors.push( new InvalidStringException( 'name' ) )
	}

	const products: PromotionProduct[] = []

	if ( json.products !== undefined ) {
		for ( const product of json.products ) {
			const p = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( product.product ) )
			if ( p instanceof BaseException ) {
				errors.push( p )
				break
			}
			const q = wrapType<ValidInteger, InvalidIntegerException>(
				() => ValidInteger.from( product.quantity ) )

			if ( q instanceof BaseException ) {
				errors.push( q )
				break
			}

			products.push( new PromotionProduct(
				q as ValidInteger,
				p as UUID
			) )
		}
	}

	if ( errors.length > 0 ) {
		return errors
	}

	return new Promotion(
		id as UUID,
		name as ValidString,
		percentage as ValidPercentage,
		creation_date as ValidDate,
		end_date as ValidDate,
		start_date as ValidDate,
		products
	)
}

export function promotionResponseToJson( promotion: PromotionResponse ): Record<string, any> {
	const jsonProducts = promotion.products.map( p => ( {
		quantity: p.quantity.value,
		product : productToJson( p.product )
	} ) )

	return {
		id        : promotion.id.value,
		name      : promotion.name.value,
		percentage: promotion.percentage.value,
		created_at: promotion.creation_date.value,
		end_date  : promotion.end_date.value,
		start_date: promotion.start_date.value,
		products  : jsonProducts
	}
}

export function promotionResponseFromJson( json: Record<string, any> ): PromotionResponse | BaseException[] {
	const errors: BaseException[] = []

	const id = wrapType<UUID, InvalidUUIDException>(
		() => UUID.from( json.id ) )

	if ( id instanceof BaseException ) {
		errors.push( new InvalidUUIDException() )
	}

	const percentage = wrapType<ValidPercentage, InvalidPercentageException>(
		() => ValidPercentage.from( json.percentage ) )

	if ( percentage instanceof BaseException ) {
		errors.push( new InvalidPercentageException( 'percentage' ) )
	}

	const creation_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.created_at ) )

	if ( creation_date instanceof BaseException ) {
		errors.push( new InvalidDateException( 'created_at' ) )
	}

	const start_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.start_date ) )

	if ( start_date instanceof BaseException ) {
		errors.push( new InvalidDateException( 'start_date' ) )
	}

	const end_date = wrapType<ValidDate, InvalidDateException>(
		() => ValidDate.from( json.end_date ) )

	if ( end_date instanceof BaseException ) {
		errors.push( new InvalidDateException( 'end_date' ) )
	}

	const name = wrapType<ValidString, InvalidStringException>(
		() => ValidString.from( json.name ) )

	if ( name instanceof BaseException ) {
		errors.push( new InvalidStringException( 'name' ) )
	}

	const products: PromotionProductResponse[] = []

	if ( json.products !== undefined ) {
		for ( const product of json.products ) {
			const p = productFromJson( product )
			if ( p instanceof BaseException ) {
				errors.push( p )
				break
			}
			const q = wrapType<ValidInteger, InvalidIntegerException>(
				() => ValidInteger.from( product.quantity ) )

			if ( q instanceof BaseException ) {
				errors.push( q )
				break
			}

			products.push( new PromotionProductResponse(
				q as ValidInteger,
				p as Product
			) )
		}
	}

	if ( errors.length > 0 ) {
		return errors
	}

	return new PromotionResponse(
		id as UUID,
		name as ValidString,
		percentage as ValidPercentage,
		creation_date as ValidDate,
		end_date as ValidDate,
		start_date as ValidDate,
		products
	)
}
