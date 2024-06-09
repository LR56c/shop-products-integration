import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'database.types'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { wrapType } from '../../shared/utils/wrap_type'
import { Password } from '../../user/domain/models/Password'
import { Auth } from '../domain/auth'
import { AuthRepository } from '../domain/auth_repository'

export class AuthSupabaseData implements AuthRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableRelatedName = 'users'

	async delete( id: UUID ): Promise<boolean> {
		try {
			const result = await this.client.auth.admin.deleteUser( id.value )

			if ( result.error ) {
				throw [ new InfrastructureException() ]
			}
			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async register( email: Email, password: Password ): Promise<Auth> {
		try {
			const authResult = await this.client.auth.signUp( {
				email   : email.value,
				password: password.value
			} )
			if ( authResult.error ) {
				console.log( 'error' )
				console.log( authResult.error )
				throw [ new InfrastructureException() ]
			}

			const errors: BaseException[] = []

			const id = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( authResult.data.user?.id ?? '' ) )

			if ( id instanceof BaseException ) {
				errors.push( new InvalidUUIDException() )
			}

			const t = await this.client.auth.getSession()
			console.log( 't.data.session.access_token' )
			console.log( t.data.session?.access_token )
			const token = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( authResult.data.session?.access_token ?? '' ) )

			if ( token instanceof BaseException ) {
				errors.push( new InvalidStringException() )
			}

			if ( errors.length > 0 ) {
				console.log( 'errr' )
				console.log( errors )
				throw errors
			}

			const auth = new Auth(
				id as UUID,
				token as ValidString
			)

			return auth
		}
		catch ( e ) {
			throw e
		}
	}

	async login( email: Email, password: Password ): Promise<Auth> {
		try {
			const authResult = await this.client.auth.signInWithPassword( {
				email   : email.value,
				password: password.value
			} )
			if ( authResult.error ) {
				throw [ new InfrastructureException() ]
			}

			const errors: BaseException[] = []

			const id = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( authResult.data.user.id ) )

			if ( id instanceof BaseException ) {
				errors.push( new InvalidUUIDException() )
			}

			const token = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( authResult.data.session.access_token ) )

			if ( token instanceof BaseException ) {
				errors.push( new InvalidStringException() )
			}

			if ( errors.length > 0 ) {
				throw errors
			}

			const auth = new Auth(
				id as UUID,
				token as ValidString
			)

			return auth
		}
		catch ( e ) {
			throw e
		}
	}

	async recover( token: ValidString ): Promise<Auth> {
		try {
			const authResult = await this.client.auth.refreshSession( {
				refresh_token: token.value
			} )

			if ( authResult.error ) {
				throw [ new InfrastructureException() ]
			}

			const errors: BaseException[] = []

			const id = wrapType<UUID, InvalidUUIDException>(
				() => UUID.from( authResult.data.user?.id ?? '' ) )

			if ( id instanceof BaseException ) {
				errors.push( new InvalidUUIDException() )
			}

			const tokenResult = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( authResult.data.session?.access_token ?? '' ) )

			if ( tokenResult instanceof BaseException ) {
				errors.push( new InvalidStringException() )
			}

			if ( errors.length > 0 ) {
				throw errors
			}

			const auth = new Auth(
				id as UUID,
				tokenResult as ValidString
			)

			return auth
		}
		catch ( e ) {
			throw e
		}
	}
}
