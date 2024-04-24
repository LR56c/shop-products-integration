import { Product } from '../domain/models/product'

export function productToJson(product: Product): Record<string, any> {
	return {
		id:product.id.value,
		code:product.code.value,
		name:product.name.value,
		description:product.description.value,
		create_at:product.create_at.value,
		brand:product.brand.value,
		price:product.price.value,
		image_url:product.image_url.value,
		stock:product.stock.value,
		rank:product.rank.value,
	}
}

export function productFromJson(json: Record<string, any>): Product | Error[] {
	try {
		return Product.from({
			id:json.id,
			code:json.code,
			name:json.name,
			description:json.description,
			create_at:json.create_at,
			brand:json.brand,
			price:json.price,
			image_url:json.image_url,
			stock:json.stock,
			rank:json.rank,
		})

	}
	catch ( e ){
		return e
	}
}
