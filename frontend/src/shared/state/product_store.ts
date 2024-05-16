import { ProductResponse } from '@features/products/domain/models/product_response.ts'
import { create } from 'zustand'

export interface ProductState {
	products: ProductResponse[]
	setProducts: ( products : ProductResponse[] ) => void
}

export const useProductStore = create<ProductState>( ( setState ) => ( {
	products   : [],
	setProducts: ( products : ProductResponse[] ) => {
		setState( {
			products: products
		} )
	}
} ) )
