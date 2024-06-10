import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { Errors } from '../../shared/domain/exceptions/errors'

import { Email } from '../../shared/domain/value_objects/email'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { DataNotFoundException } from '../../shared/infrastructure/data_not_found_exception'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import {
	rankFromJson,
	rankToJson
} from '../application/rank_mapper'
import { Rank } from '../domain/rank'
import { RankRepository } from '../domain/rank_repository'

export class RankSupabaseData implements RankRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'rank'

	async updateRank( rank: Rank ): Promise<boolean> {
		try {
			const result = await this.client.from( this.tableName )
			                         .update( rankToJson( rank ) as any )
			                         .eq( 'product_code', rank.code.value )
			                         .eq( 'user_email', rank.user_email.value )

			if ( result.error?.code === '23503' ) {
				throw [ new DataNotFoundException() ]
			}

			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async addRank( rank: Rank ): Promise<boolean> {
		try {
			const result = await this.client.from( this.tableName )
			                         .insert( rankToJson( rank ) as any )
			if ( result.error?.code === '23505' ) {
				throw [ new KeyAlreadyExistException( 'rank' ) ]
			}
			if ( result.error?.code === '23503' ) {
				throw [ new DataNotFoundException() ]
			}
			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async getRank( user_email: Email, code: ValidString ): Promise<Rank> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'product_code', code.value )
			                         .eq( 'user_email', user_email.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}

			if ( result.data.length === 0 ) {
				throw [ new DataNotFoundException() ]
			}

			const product = rankFromJson( result[0] )

			if ( product instanceof Errors ) {
				throw [ ...product.values ]
			}

			return product as Rank
		}
		catch ( e ) {
			throw e
		}
	}

	async getAllRankByProductID( code: ValidString ): Promise<Rank[]> {
		try {

			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'product_code', code.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}

			if ( result.data.length === 0 ) {
				throw [ new DataNotFoundException() ]
			}

			const ranks: Rank[] = []
			for ( const json of result.data ) {

				const product = rankFromJson( json )

				if ( product instanceof Errors ) {
					throw [ ...product.values ]
				}
				ranks.push( product as Rank )
			}

			return ranks
		}
		catch ( e ) {
			throw e
		}
	}
}
