import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import {
	categoryFromJson,
	categoryToJson
} from '../application/category_mapper'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import { CategoryRepository } from '../domain/category_repository'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { Category } from '../domain/category'

export class CategorySupabaseData implements CategoryRepository {
	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'categories'

	async save( category: Category ): Promise<boolean> {
		const result = await this.client.from( this.tableName )
		                         .insert( categoryToJson( category ) as any )

		if ( result.error != null ) {
			if ( result.error.code === '23505' ) {
				throw [ new KeyAlreadyExistException( 'name' ) ]
			}
			throw [ new InfrastructureException() ]

		}

		return true
	}

	async delete( category: Category ): Promise<boolean> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'name', category.name.value )

			if ( result.data?.length === 0 ) {
				throw [ new ParameterNotMatchException( 'name' ) ]
			}

			await this.client.from( this.tableName )
			          .delete()
			          .eq(
				          'name',
				          category.name.value
			          )
			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async get( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<Category[]> {
		try {
			const result = this.client.from( this.tableName )
			                   .select()

			if ( name !== undefined ) {
				result.like( 'name', `%${ name.value }%` )
			}

			const { data, error } = await result.range( from.value, to.value )

			if ( error ) {
				throw [ new InfrastructureException() ]
			}

			if ( data.length === 0 ) {
				throw [ new ParameterNotMatchException( 'name' ) ]
			}

			const categories: Category[] = []

			for ( const json of data ) {
				const c = categoryFromJson( json )

				if ( c instanceof BaseException ) {
					throw c
				}

				categories.push( c as Category )
			}

			return categories
		}
		catch
			( e )
		{
			throw e
		}

	}

}
