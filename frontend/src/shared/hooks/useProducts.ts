import { CreateProduct } from '@features/products/application/create_product.ts'
import {
	PartialProductProps,
	Product
} from '@features/products/domain/models/product.ts'
import { ProductRepository } from '@features/products/domain/repository/product_repository.ts'
import { ProductApiData } from '@features/products/infrastructure/product_api_data.ts'
import { UUID } from '@features/shared/domain/value_objects/UUID.ts'
import { ValidInteger } from '@features/shared/domain/value_objects/ValidInteger.ts'
import { ValidString } from '@features/shared/domain/value_objects/ValidString.ts'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useProductStore } from '../state/product_store'

export const productRepository: ProductRepository = new ProductApiData()

export const useProducts = () => {

	const state = useProductStore( ( state ) => state )

	useEffect( () => {
		productRepository.getAll(
			ValidInteger.from( 0 ),
			ValidInteger.from( 10 )
		)
		                 .then( ( products ) => {
			                 state.setProducts( products )
		                 } )
	}, [] )

	const getAll = ( from: ValidInteger, to: ValidInteger,
		name ?: ValidString ) => {
		return useQuery( {
			queryKey: [ `product-${ from.value }-${ to.value }-${ name !== undefined
				? `${ name }-`
				: '' }all-repo-data` ],
			queryFn : () => {
				return productRepository.getAll( from, to, name )
			}
		} )
	}

	const getByID = ( id: UUID ) => {
		return useQuery( {
			queryKey: [ `product-${ id.value }-repo-data` ],
			queryFn : () => {
				return productRepository.getProduct( id )
			}
		} )
	}

	const create = ( props : PartialProductProps ) => {
		return useQuery( {
			queryKey: [ `product-${props.product_code}-create-repo-data` ],

			queryFn : () => {
				return CreateProduct( productRepository, props )
			}
		} )
	}

	return {
		products: state.products,
		getAll,
		getByID,
		create
	}
}
