import { Product } from '@features/products/domain/models/Product'
import { create } from 'zustand'

export interface ProductState {
	products: Product[]
	setProducts: ( products : Product[] ) => void
}

export const useProductStore = create<ProductState>( ( setState ) => ( {
	products   : [],
	setProducts: ( products : Product[] ) => {
		setState( {
			products: products
		} )
	}
} ) )
