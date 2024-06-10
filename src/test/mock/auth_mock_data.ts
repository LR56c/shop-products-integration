import { Auth } from '../../../packages/auth/domain/auth'
import { AuthRepository } from '../../../packages/auth/domain/auth_repository'
import { Email } from '../../../packages/shared/domain/value_objects/email'
import { UUID } from '../../../packages/shared/domain/value_objects/uuid'
import { ValidString } from '../../../packages/shared/domain/value_objects/valid_string'
import { Password } from '../../../packages/user/domain/models/Password'
import { UUIDMother } from '../objects_mothers/shared/uuid_mother'

export class AuthMockData implements AuthRepository {

	private mockRegister = jest.fn()
	private mockLogin    = jest.fn()
	private mockRecover = jest.fn()
	private mockDelete = jest.fn()

	constructor( private db: Array<Auth> ) {}

	async register( email: Email, password: Password ): Promise<Auth> {
		this.mockRegister( email, password )
		console.log( 'result register', email, password )
		return this.db[0]
	}

	assertRegisterHasBeenCalledWith( email: Email, password: Password ) {
		expect( this.mockRegister ).toHaveBeenCalledWith( email, password )
	}

	async login( email: Email, password: Password ): Promise<Auth> {
		this.mockLogin( email, password )
		console.log( 'result login', email, password)
		return this.db[0]
	}

	assertLoginHasBeenCalledWith( email: Email, password: Password ) {
		expect( this.mockLogin ).toHaveBeenCalledWith( email, password )
	}

	async recover( token: ValidString ): Promise<Auth> {
		this.mockRecover( token )
		console.log( 'result recover', token )
		const current = this.db[0]
		const t = ValidString.from(UUIDMother.random().value)
		return new Auth( current.id, t)
	}

	assertRecoverHasBeenCalledWith( token: ValidString ) {
		expect( this.mockRecover ).toHaveBeenCalledWith( token )
	}

	async delete( id: UUID ): Promise<boolean> {
		this.mockDelete( id )
		console.log( 'result delete', id )
		return true
	}

	assertDeleteHasBeenCalledWith( id: UUID ) {
		expect( this.mockDelete ).toHaveBeenCalledWith( id )
	}
}
