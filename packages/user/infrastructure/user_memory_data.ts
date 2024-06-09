import { Email } from '../../shared/domain/value_objects/email'
import { Role } from '../../shared/domain/value_objects/role'
import { ValidInteger } from '../../shared/domain/value_objects/valid_integer'
import { ValidString } from '../../shared/domain/value_objects/valid_string'
import { InfrastructureException } from '../../shared/infrastructure/infrastructure_exception'
import { UserDao } from '../domain/dao/UserDao'
import { User } from '../domain/models/User'

export class UserMemoryData implements UserDao {

	readonly emailDB: Map<string, User>
	readonly db: Map<string, User>

	constructor( db: User[] )
	{
		this.db      = new Map()
		this.emailDB = new Map()
		db.forEach( ( user ) => {
			this.db.set( user.auth_id.value, user )
			this.emailDB.set( user.email.value, user )
		} )
	}

	async create( user: User ): Promise<boolean> {
		try {

			const emailExist = this.emailDB.get( user.email.value )

			if ( emailExist !== undefined ) {
				throw [ new InfrastructureException() ]
			}

			this.db.set( user.auth_id.value, user )
			this.emailDB.set( user.email.value, user )
			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async get( from: ValidInteger, to: ValidInteger, role?: Role,
		name?: ValidString ): Promise<User[]> {
		try {
			let result = Array.from( this.db.values() )

			if ( role !== undefined ) {
				result = result.filter( user => user.role.value === role.value )
			}

			if ( name !== undefined ) {
				result = result.filter( user => user.name.value === name.value )
			}

			return result.slice( from.value, to.value )
		}
		catch ( e ) {
			throw [ new InfrastructureException() ]
		}
	}

	async getOne( email: Email ): Promise<User> {
		try {

			const user = this.emailDB.get( email.value )

			if ( user === undefined ) {
				throw [ new InfrastructureException() ]
			}
			return user
		}
		catch ( e ) {
			throw e
		}
	}

	async update( email: Email, user: User ): Promise<boolean> {
		try {
			const emailUser = this.emailDB.get( email.value )

			if ( emailUser === undefined ) {
				throw [ new InfrastructureException() ]
			}

			this.db.set( user.auth_id.value, user )
			this.emailDB.set( user.email.value, user )

			return true
		}
		catch ( e ) {
			throw e
		}
	}

	async delete( email: Email ): Promise<boolean> {
		try {
			const user = this.emailDB.get( email.value )

			if ( user === undefined ) {
				throw [ new InfrastructureException() ]
			}

			this.db.delete( user.auth_id.value )
			this.emailDB.delete( user.email.value )

			return true
		}
		catch ( e ) {
			throw e
		}
	}
}
