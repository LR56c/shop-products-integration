import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
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

	readonly tableName = 'rank'

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

	async getAllRankByProductID( code: ValidString ): Promise<Rank[]> {
		try {

			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'product_code', code.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}

			const ranks: Rank[] = []
			for ( const json of result.data ) {

				const product = rankFromJson( json )

				if ( product instanceof BaseException ) {
					throw product
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
