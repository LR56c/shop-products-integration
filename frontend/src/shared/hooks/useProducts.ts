import { ProductRepository } from '@features/products/domain/repository/product_repository.ts'
import { ProductApiData } from '@features/products/infrastructure/product_api_data.ts'
import { ValidInteger } from '@features/shared/domain/value_objects/ValidInteger.ts'
import { ValidString } from '@features/shared/domain/value_objects/ValidString.ts'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useProductStore } from '../state/product_store'
// import { useProductStore } from '../state/product_store'

export const productRepository: ProductRepository = new ProductApiData()

export const useProducts = () => {

	const state = useProductStore( ( state ) => state )

	useEffect(  () => {
		console.log( 'useEffect' )
		state.getProducts( productRepository )
	}, [] )

	const getAll = ( from: ValidInteger, to: ValidInteger,
		name ?: ValidString ) => {
		return useQuery( {
			queryKey: [ 'product-repo-data' ],
			queryFn : () => {
				return productRepository.getAll( from, to, name )
			}
		} )
	}

	return {
		products: state.products,
		getAll
	}
}
