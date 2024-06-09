import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { Errors } from '../../shared/domain/exceptions/errors'
import { Email } from '../../shared/domain/value_objects/email'
import { Role } from '../../shared/domain/value_objects/role'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'

import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { LimitIsNotInRangeException } from '../../shared/infrastructure/limit_is_not_in_range_exception'
import { ParameterNotMatchException } from '../../shared/infrastructure/parameter_not_match_exception'
import {
	userFromJson,
	userToJson
} from '../application/user_mapper'
import { UserDao } from '../domain/dao/UserDao'
import { User } from '../domain/models/User'

export class UserSupaBaseData implements UserDao {
	constructor( private readonly client: SupabaseClient<Database> ) {}

	async getOneUser( email: Email ): Promise<User> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'email', email.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}

			if ( result.data.length === 0 ) {
				throw [ new ParameterNotMatchException( 'email' ) ]
			}

			const user = userFromJson( result.data[0] )

			if ( user instanceof Errors ) {
				throw [ ...user.values ]
			}

			return user as User
		}
		catch ( e ) {
			throw e
		}
	}

	readonly tableName = 'users'

	async getUser( from: ValidInteger, to: ValidInteger, role?: Role,
		name?: ValidString ): Promise<User[]> {
		try {

			const result = this.client.from( this.tableName )
			                   .select()

			if ( role !== undefined ) {
				result.eq( 'role_type', role.value )
			}

			if ( name !== undefined ) {
				result.eq( 'name', name.value )
			}

			const { data, error } = await result.range( from.value, to.value )

			if ( error ) {
				if ( error.code === 'PGRST103' ) {
					throw [ new LimitIsNotInRangeException() ]
				}
				if ( error.code === '22P02' ) {
					throw [ new ParameterNotMatchException() ]
				}
				throw [ new InfrastructureException() ]
			}

			const users: User[] = []
			for ( const json of data ) {
				const user = userFromJson( json )
				if ( user instanceof Errors ) {
					throw [ ...user.values ]
				}
				users.push( user as User )
			}
			return users
		}
		catch ( e ) {
			throw e
		}
	}

	async updateUser( email: ValidString, user: User ): Promise<boolean> {
		try {
			await this.client.from( this.tableName )
			          .update( userToJson( user ) as any )
			          .eq( 'email', email.value )
			return true
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}
	}

	async deleteUser( email: ValidString ): Promise<boolean> {
		try {
			const result = await this.client.from( this.tableName )
			                         .select()
			                         .eq( 'email', email.value )

			if ( result.data?.length === 0 ) {
				throw [ new ParameterNotMatchException() ]
			}

			await this.client.from( this.tableName )
			          .delete()
			          .eq( 'email', email.value )
			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async createUser( user: User ): Promise<boolean> {
		try {
			await this.client.from( this.tableName )
			          .insert( userToJson( user ) as any )
			return true
		}
		catch ( e ) {
			console.log( 'user e' )
			console.log( e )
			throw [ new InfrastructureException() ]
		}
	}
}
