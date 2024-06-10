import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { Errors } from '../../../packages/shared/domain/exceptions/errors'
import { wrapTypeErrors } from '../../../packages/shared/utils/wrap_type'
import { Auth } from '../../../packages/auth/domain/auth'
import { AuthRepository } from '../../../packages/auth/domain/auth_repository'
import { AuthMemoryData } from '../../../packages/auth/infrastructure/auth_memory_data'
import { UserDao } from '../../../packages/user/domain/dao/UserDao'
import { UserMemoryData } from '../../../packages/user/infrastructure/user_memory_data'
import { AuthMother } from '../../test/objects_mothers/auth/auth_mother'
import { PasswordMother } from '../../test/objects_mothers/shared/password_mother'
import { UserMother } from '../../test/objects_mothers/users/user_mother'
import { AuthUserDto } from '../shared/auth_user_dto'
import { RegisterAuthService } from './register-auth.service'

describe( 'RegisterAuthService', () => {
	let service: RegisterAuthService
	let authRepo: AuthRepository
	let userRepo: UserDao

	// const p1 = PasswordMother.random()
	// const a1 = AuthMother.random()
	// const u1 = UserMother.random( a1.id )
	//
	// const p2 = PasswordMother.random()
	// const a2 = AuthMother.random()
	// const u2 = UserMother.random( a2.id )
	//
	// const p3     = PasswordMother.random()
	// const a3     = AuthMother.random()
	// const u3     = UserMother.random( a3.id )
	// const userDB = [ u1, u2, u3 ]
	// const authDB: {
	// 	password: Password,
	// 	email: Email,
	// 	auth: Auth
	// }[]          = [ {
	// 	password: p1,
	// 	email   : u1.email,
	// 	auth    : a1
	// }, {
	// 	password: p2,
	// 	email   : u2.email,
	// 	auth    : a2
	// }, {
	// 	password: p3,
	// 	email   : u3.email,
	// 	auth    : a3
	// } ]

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [
				{
					provide   : AuthRepository,
					useFactory: () => {
						return new AuthMemoryData( [] )
					}
				},
				{
					provide   : UserDao,
					useFactory: () => {
						return new UserMemoryData( [] )
					}
				},
				RegisterAuthService ]
		} )
		                                        .compile()

		service  = module.get<RegisterAuthService>( RegisterAuthService )
		authRepo = module.get<AuthRepository>( AuthRepository )
		userRepo = module.get<UserDao>( UserDao )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )

	it( 'should be registered user & auth', async () => {

		const p1 = PasswordMother.random()
		const a1 = AuthMother.random()
		const u1 = UserMother.random( a1.id )
		const dto: AuthUserDto = {
			rut  : u1.rut.value,
			role : u1.role.value,
			email: u1.email.value,
			name : u1.name.value
		}
		console.log( 'input dto:', dto)
		console.log( 'input password:', p1.value)

		const result = await service.register( dto, p1.value )

		const auth = await authRepo.login( u1.email, p1 )
		const user = await userRepo.getOne( u1.email )

		console.log( 'output result:', result)
		console.log( 'output auth:', auth)
		console.log( 'output user:', user)
		expect( result ).toBeInstanceOf(Auth)
		expect( auth ).toBeInstanceOf(Auth)
		expect( user.email.value ).toBe( u1.email.value )
		expect( user.role.value ).toBe( u1.role.value )
		expect( user.rut.value ).toBe( u1.rut.value )
		expect( user.name.value ).toBe( u1.name.value )
	} )

	it( 'should not be registered user & auth', async () => {
		const p1 = PasswordMother.random()
		const a1 = AuthMother.random()
		const u1 = UserMother.random( a1.id )
		const dto: AuthUserDto = {
			rut  : '',
			role : '',
			email: '',
			name : '',
		}
		console.log( 'input dto:', dto)
		console.log( 'input password:', p1.value)

		const result = await wrapTypeErrors(()=>service.register( dto, p1.value ))

		const auth = await wrapTypeErrors(()=>authRepo.login( u1.email, p1 ))
		const user = await wrapTypeErrors(()=>userRepo.getOne( u1.email ))

		if( result instanceof Errors ) {
			const errors = result.values.map( e => e.name)
			console.log('result error:', errors)
		}
		if( auth instanceof Errors ) {
			const errors = auth.values.map( e => e.name)
			console.log('auth error:', errors)
		}
		if( user instanceof Errors ) {
			const errors = user.values.map( e => e.name)
			console.log('user error:', errors)
		}
		expect( result ).toBeInstanceOf(Errors)
		expect( auth ).toBeInstanceOf(Errors)
		expect( user ).toBeInstanceOf(Errors)
	} )
} )
