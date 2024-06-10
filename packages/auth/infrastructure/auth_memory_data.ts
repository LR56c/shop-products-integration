import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { Password } from '../../user/domain/models/Password'
import { Auth } from '../domain/auth'
import { AuthRepository } from '../domain/auth_repository'

export class AuthMemoryData implements AuthRepository {

	constructor( db: {
		password: Password,
		email: Email,
		auth: Auth
	}[] )
	{
		this.db      = new Map()
		this.dbp     = new Map()
		this.dbEmail = new Map()
		this.dbToken = new Map()

		db.forEach( ( { password, email, auth } ) => {
			this.db.set( auth.id.value, auth )
			this.dbp.set( auth.id.value, password )
			this.dbEmail.set( email.value, auth.id.value )
			this.dbToken.set( auth.token.value, auth.id.value )
		} )
	}

	// id auth
	readonly db: Map<string, Auth>
	// id pw
	readonly dbp: Map<string, Password>
	// email id
	readonly dbEmail: Map<string, string>
	// token id
	readonly dbToken: Map<string, string>

	async register( email: Email, password: Password ): Promise<Auth> {
		try {
			const emailExist = this.dbEmail.get( email.value )

			if ( emailExist !== undefined ) {
				throw [ new InfrastructureException() ]
			}

			const auth = new Auth( UUID.create(),
				ValidString.from( UUID.create().value ) )
			this.db.set( auth.id.value, auth )
			this.dbp.set( auth.id.value, password )
			this.dbEmail.set( email.value, auth.id.value )
			this.dbToken.set( auth.token.value, auth.id.value )
			return auth
		}
		catch ( e ) {
			throw e
		}
	}

	async login( email: Email, password: Password ): Promise<Auth> {
		try {
			const idAuthByEmail = this.dbEmail.get( email.value )

			if ( idAuthByEmail === undefined ) {
				throw [ new InfrastructureException() ]
			}

			const pass = this.dbp.get( idAuthByEmail )

			if ( pass?.value !== password.value ) {
				throw [ new InfrastructureException() ]
			}

			return this.db.get( idAuthByEmail )!
		}
		catch ( e ) {
			throw e
		}
	}

	async recover( token: ValidString ): Promise<Auth> {
		try {
			const dbToken = this.dbToken.get( token.value )

			if ( dbToken === undefined ) {
				throw [ new InfrastructureException() ]
			}

			const auth = this.db.get( dbToken )!

			const newAuth = new Auth( auth.id,
				ValidString.from( UUID.create().value ) )
			this.db.set( newAuth.id.value, newAuth )
			this.dbToken.set( newAuth.id.value, newAuth.token.value )
			return newAuth
		}
		catch ( e ) {
			throw e
		}
	}

	async delete( id: UUID ): Promise<boolean> {
		try {
			const auth = this.db.get( id.value )

			if ( auth === undefined ) {
				console.log( 'auth not found')
				throw [ new InfrastructureException() ]
			}

			this.db.delete( id.value )
			this.dbp.delete( id.value )
			this.dbEmail.delete( id.value )
			this.dbToken.delete( id.value )
			return true
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}
	}

}
