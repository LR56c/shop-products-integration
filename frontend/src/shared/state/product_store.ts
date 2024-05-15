import { Product } from '@features/products/domain/models/Product'
import { ProductRepository } from '@features/products/domain/repository/product_repository.ts'
import { ValidInteger } from '@features/shared/domain/value_objects/ValidInteger'
import { create } from 'zustand'

export interface ProductState {
	products: Product[]
	getProducts: ( repo : ProductRepository ) => void
}

export const useProductStore = create<ProductState>( ( setState ) => ( {
	products   : [],
	getProducts: async ( repo: ProductRepository ) => {
		const r = await repo.getAll(
			ValidInteger.from( 0 ),
			ValidInteger.from( 10 )
		)
		console.log( 'r')
		console.log( r)
		setState( {
			products: r
		} )
	}
} ) )
