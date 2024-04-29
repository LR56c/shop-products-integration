import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import {
	rankFromJson,
	rankToJson
} from '../application/rank_mapper'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { RankRepository } from '../domain/rank_repository'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { Rank } from '../domain/rank'

export class RankSupabaseData implements RankRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'rank'

	async addRank( rank: Rank ): Promise<boolean> {
		try {
			await this.client.from( this.tableName )
			          .insert( rankToJson( rank ) as any )
			return true
		}
		catch ( e ) {
			console.log( 'supabase unexpected error' )
			console.log( e )
			throw [ new InfrastructureException() ]
		}
	}

	async getAllRankByCode( code: ValidString ): Promise<Rank[]> {
		const result = await this.client.from( this.tableName )
		                         .select()
		                         .eq( 'product_code', code.value )

		if ( result.error ) {
			console.log( 'supabase unexpected error' )
			console.log( result.error )
			throw [ new InfrastructureException() ]
		}

		const ranks: Rank[]     = []
		for ( const json of result.data ) {

			const product = rankFromJson( json )

			if ( product instanceof BaseException ) {
				throw product
			}
			ranks.push( product as Rank )
		}

		return ranks
	}
}
