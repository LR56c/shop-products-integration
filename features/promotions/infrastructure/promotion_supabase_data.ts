import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import {
	promotionFromJson,
	promotionToJson
} from '../application/promotion_mapper'
import { PromotionRepository } from '../domain/promotion_repository'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import { Product } from '../../products/domain/models/product'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { ValidDate } from '../../shared/domain/value_objects/ValidDate'
import { ValidInteger } from '../../shared/domain/value_objects/ValidInteger'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { Promotion } from '../domain/promotion'

export class PromotionSupabaseData implements PromotionRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'promotions'

	async add( promotion: Promotion ): Promise<boolean> {
		const result = await this.client.from( this.tableName )
		                         .insert( promotionToJson( promotion ) as any )

		if ( result.error != null ) {
			if ( result.error.code === '23505' ) {
				throw [ new KeyAlreadyExistException() ]
			}

			throw [ new InfrastructureException() ]
		}
		return true
	}

	async remove( id: UUID ): Promise<boolean> {
		try {

			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'id', id.value )

			if ( result.data?.length === 0 ) {
				throw [ new ParameterNotMatchException() ]
			}

			await this.client.from( this.tableName )
			          .delete()
			          .eq( 'id', id.value )

			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async update( id: UUID, promotion: Promotion ): Promise<boolean> {
		try {
			await this.client.from( this.tableName )
			          .update( promotionToJson( promotion ) as any )
			          .eq( 'id', id.value )
			return true
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}
	}

	async discount( products: Product[] ): Promise<boolean> {
		throw new Error( 'Method not implemented.' )
	}

	async getAll( from: ValidInteger, to: ValidInteger, name?: ValidString,
		from_date?: ValidDate, to_date?: ValidDate ): Promise<Promotion[]> {
		try {
			const result = this.client.from( this.tableName )
			                   .select()
			if ( name !== undefined ) {
				result.eq( 'name', name?.value )
			}
			if ( from_date !== undefined && to_date !== undefined ) {
				result.lte( 'date', from_date.value )
				result.gte( 'date', to_date.value )
			}
			const { data, error } = await result.range( from.value, to.value )
			if ( error ) {
				if ( error.code === '22P02' ) {
					throw [ new ParameterNotMatchException() ]
				}
				throw [ new InfrastructureException() ]
			}
			const promotions: Promotion[] = []
			for ( const json of data ) {
				const p = promotionFromJson( json )
				if ( p instanceof BaseException ) {
					throw [ p ]
				}
				promotions.push( p as Promotion )
			}
			return promotions
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}
	}

	async getByID( id: UUID ): Promise<Promotion> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'id', id.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}

			if ( result.data.length === 0 ) {
				throw [ new ParameterNotMatchException() ]
			}

			const promotion = promotionFromJson( result.data[0] )

			if ( promotion instanceof BaseException ) {
				throw promotion
			}

			return promotion as Promotion
		}
		catch ( e ) {
			throw e
		}
	}

}
