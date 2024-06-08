import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { KeyAlreadyExistException } from '../../shared/infrastructure/key_already_exist_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import {
	shopAddressFromJson,
	shopAddressToJson
} from '../application/shop-address-mapper'
import { ShopAddressRepository } from '../domain/shop-address-repository'
import { ShopAddress } from '../domain/shop-address'

export class ShopAddressSupabaseData implements ShopAddressRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableName = 'shops_address'

	async createShopAddress( shopAddress: ShopAddress ): Promise<boolean> {

		const result = await this.client.from( this.tableName )
		                         .insert( shopAddressToJson( shopAddress ) as any )

		if ( result.error != null ) {
			if ( result.error.code === '23505' ) {
				throw [ new KeyAlreadyExistException( 'name' ) ]
			}
			throw [ new InfrastructureException() ]

		}

		return true
	}

	async deleteShopAddress( shopAddress: ShopAddress ): Promise<boolean> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'name', shopAddress.name.value )

			if ( result.data?.length === 0 ) {
				throw [ new ParameterNotMatchException( 'name' ) ]
			}

			await this.client.from( this.tableName )
			          .delete()
			          .eq(
				          'name',
				          shopAddress.name.value
			          )
			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async getShopAddress( from: ValidInteger, to: ValidInteger,
		name?: ValidString ): Promise<ShopAddress[]> {
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

			const shopAddresses: ShopAddress[] = []

			for ( const json of data ) {
				const shopAddress = shopAddressFromJson( json )

				if ( shopAddress instanceof BaseException ) {
					throw shopAddress
				}

				shopAddresses.push( shopAddress as ShopAddress )
			}

			return shopAddresses
		}
		catch
			( e )
		{
			throw e
		}

	}

}
