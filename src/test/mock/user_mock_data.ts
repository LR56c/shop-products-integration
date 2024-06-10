import { Email } from 'packages/shared/domain/value_objects/email'
import { Role } from 'packages/shared/domain/value_objects/role'
import { ValidInteger } from 'packages/shared/domain/value_objects/valid_integer'
import { ValidString } from 'packages/shared/domain/value_objects/valid_string'
import { UserDao } from 'packages/user/domain/dao/UserDao'
import { User } from 'packages/user/domain/models/User'

export class UserMockData implements UserDao {
	private mockCreate = jest.fn()
	private mockGetAll = jest.fn()
	private mockGet    = jest.fn()
	private mockUpdate = jest.fn()
	private mockDelete = jest.fn()

	constructor( private db: Array<User> ) {}

	async create( user: User ): Promise<boolean> {
		this.mockCreate( user )
		console.log( 'result create:', user )
		return true
	}

	assertCreatedHasBeenCalledWith( user: User ) {
		expect( this.mockCreate )
			.toHaveBeenCalledWith( user )
	}

	async get( from: ValidInteger, to: ValidInteger, role?: Role | undefined,
		name?: ValidString | undefined ): Promise<User[]> {
		this.mockGetAll( from, to, role, name )
		console.log( 'result get:', from, to, role, name )
		return this.db
	}

	assertGetAllHasBeenCalledWith( from: ValidInteger, to: ValidInteger,
		role?: Role | undefined, name?: ValidString | undefined )
	{
		expect( this.mockGetAll )
			.toHaveBeenCalledWith( from, to, role, name )
	}

	async getOne( email: Email ): Promise<User> {
		this.mockGet( email )
		console.log( 'result get:', email )
		return this.db[0]
	}

	assertGetOneHasBeenCalledWith( email: Email ) {
		expect( this.mockGet )
			.toHaveBeenCalledWith( email )
	}

	async update( email: Email, user: User ): Promise<boolean> {
		this.mockUpdate( email, user )
		console.log( 'result update:', email, user )
		return true
	}

	assertUpdateHasBeenCalledWith( email: Email, user: User ) {
		expect( this.mockUpdate )
			.toHaveBeenCalledWith( email, user )
	}

	async delete( email: Email ): Promise<boolean> {
		this.mockDelete( email )
		console.log( 'result delete:', email )
		return true
	}

	assertDeletedHasBeenCalledWith( email: Email ) {
		expect( this.mockDelete )
			.toHaveBeenCalledWith( email )
	}
}
