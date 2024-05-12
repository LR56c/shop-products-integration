import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from 'backend/database.types'
import { BaseException } from '../../shared/domain/exceptions/BaseException'
import { InvalidStringException } from '../../shared/domain/exceptions/InvalidStringException'
import { InvalidUUIDException } from '../../shared/domain/exceptions/InvalidUUIDException'
import { UUID } from '../../shared/domain/value_objects/UUID'
import { wrapType } from '../../shared/utils/WrapType'
import { AuthRepository } from '../domain/auth_repository'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { Email } from '../../shared/domain/value_objects/Email'
import { ValidString } from '../../shared/domain/value_objects/ValidString'
import { Password } from '../../user/domain/models/Password'
import { Auth } from '../domain/auth'

export class AuthSupabaseData implements AuthRepository {

	constructor( private readonly client: SupabaseClient<Database> ) {}

	readonly tableRelatedName = 'users'

	async register( email: Email, password: Password ): Promise<Auth> {
		try {
			const authResult = await this.client.auth.signUp( {
				email   : email.value,
				password: password.value
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

			const token = wrapType<ValidString, InvalidStringException>(
				() => ValidString.from( authResult.data.session?.access_token ?? '' ) )

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

	//TODO: decision union auth/user. podria ser al crear usuario se crea auth. y tener un endpoint solo de login. y el resto hacer middleware o pedir token. revisar union report

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

	async logout(): Promise<boolean> {
		try {
			await this.client.auth.signOut()
			return true
		}
		catch ( e ) {
			throw [ new InfrastructureException( 'logout' ) ]
		}
	}

}
