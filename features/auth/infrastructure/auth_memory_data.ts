import { Email } from '../../shared/domain/value_objects/email'
import { UUID } from '../../shared/domain/value_objects/uuid'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { Password } from '../../user/domain/models/Password'
import { Auth } from '../domain/auth'
import { AuthRepository } from '../domain/auth_repository'

export class AuthMemoryData implements AuthRepository {

	constructor() {
		this.db      = new Map()
		this.dbp     = new Map()
		this.dbEmail = new Map()
		this.dbToken = new Map()
	}

	readonly db: Map<string, Auth>
	readonly dbp: Map<string, Password>
	readonly dbEmail: Map<string, string>
	readonly dbToken: Map<string, string>

	async register( email: Email, password: Password ): Promise<Auth> {
		try {
			const auth = new Auth( UUID.create(),
				ValidString.from( UUID.create().value ) )
			this.db.set( auth.id.value, auth )
			this.dbEmail.set( auth.id.value, email.value )
			this.dbp.set( auth.id.value, password )
			this.dbToken.set( auth.id.value, auth.token.value )
			return auth
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}
	}

	async login( email: Email, password: Password ): Promise<Auth> {
		try {
			const auth = this.db.get( email.value )

			if ( auth === undefined ) {
				throw [ new InfrastructureException() ]
			}

			const pass = this.dbp.get( auth.id.value )

			if ( pass !== password ) {
				throw [ new InfrastructureException() ]
			}
			return auth
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
