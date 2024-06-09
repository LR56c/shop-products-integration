import { ValidRank } from '../../../shared/domain/value_objects/valid_rank'
import { InsufficientStockException } from '../exceptions/InsufficientStockException'
import { UUID } from '../../../shared/domain/value_objects/uuid'
import { ValidDate } from '../../../shared/domain/value_objects/valid_date'
import { ValidInteger } from '../../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../../shared/domain/value_objects/valid_string'
import { ValidURL } from '../../../shared/domain/value_objects/valid_url'

export class Product {
	constructor(
		readonly id: UUID,
		readonly code: ValidString,
		readonly product_code: ValidString,
		readonly name: ValidString,
		readonly description: ValidString,
		readonly created_at: ValidDate,
		readonly brand: ValidString,
		readonly price: ValidInteger,
		readonly image_url: ValidURL,
		readonly stock: ValidInteger,
		readonly average_rank: ValidRank,
		readonly category: ValidString,
		readonly discount?: UUID
	)
	{}

	subtractStock( newQuantity: ValidInteger ): Product {
		if ( newQuantity.value > this.stock.value ) {
			throw new InsufficientStockException()
		}

		return new Product(
			this.id,
			this.code,
			this.product_code,
			this.name,
			this.description,
			this.created_at,
			this.brand,
			this.price,
			this.image_url,
			newQuantity,
			this.average_rank,
			this.category,
			this.discount
		)
	}
}
