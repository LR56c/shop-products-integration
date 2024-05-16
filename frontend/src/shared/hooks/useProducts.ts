import { CreateProduct } from '@features/products/application/create_product.ts'
import { DeleteProduct } from '@features/products/application/delete_product.ts'
import { GetAllProducts } from '@features/products/application/get_all_products.ts'
import { GetProduct } from '@features/products/application/get_product.ts'
import { UpdateProduct } from '@features/products/application/update_product.ts'
import { ProductResponse } from '@features/products/domain/models/product_response.ts'
import { ProductRepository } from '@features/products/domain/repository/product_repository.ts'
import { ProductApiData } from '@features/products/infrastructure/product_api_data.ts'
import { UUID } from '@features/shared/domain/value_objects/UUID.ts'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useProductStore } from '../state/product_store'
import { CreateProductProps } from '../../presentation/products/models/partial_product'
import { PartialProductProps } from '../../presentation/products/models/partial_product_props'

export const productRepository: ProductRepository = new ProductApiData()

export const useProducts = () => {

	const state = useProductStore( ( state ) => state )

	useEffect( () => {
		GetAllProducts( productRepository, { from: 0, to: 10 } )
			.then( ( products ) => {
				state.setProducts( products )
			} )
	}, [] )

	const getAll = ( from: number, to: number,
		name ?: string ) => {
		return useQuery( {
			queryKey: [ `product-${ from }-${ to }-${ name !== undefined
				? `${ name }-`
				: '' }all-repo-data` ],
			queryFn : () => {
				return GetAllProducts( productRepository, { from, to, name } )
			}
		} )
	}


	const remove = ( id: string ) => {
		return useQuery( {
			queryKey: [ `product-remove-${ id }-repo-data` ],
			queryFn : () => {
				return DeleteProduct( productRepository, id )
			}
		} )
	}

	const getByID = ( id: string ) => {
		return useQuery( {
			queryKey: [ `product-${ id }-repo-data` ],
			queryFn : () => {
				return GetProduct( productRepository, id )
			}
		} )
	}

	const create = ( props: CreateProductProps ) => {
		return useQuery( {
			queryKey: [ `product-${ props.product_code }-create-repo-data` ],

			queryFn: () => {
				return CreateProduct( productRepository, props )
			}
		} )
	}

	const update = ( id: UUID, product : ProductResponse,  props: PartialProductProps ) => {
		return useQuery( {
			queryKey: [ `product-update-${ props.product_code }-create-repo-data` ],

			queryFn: () => {
				return UpdateProduct( productRepository, id, product, props )
			}
		} )
	}

	//TODO: hacer recommend con state aparte
	return {
		products: state.products,
		update,
		remove,
		getAll,
		getByID,
		create
	}
}
