import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { AuthRepository } from '../../../packages/auth/domain/auth_repository'
import { AuthMemoryData } from '../../../packages/auth/infrastructure/auth_memory_data'
import { UserDao } from '../../../packages/user/domain/dao/UserDao'
import { UserMemoryData } from '../../../packages/user/infrastructure/user_memory_data'
import { i18nModule } from '../../app.module'
import { TranslationService } from '../../shared/services/translation/translation.service'
import { AuthMother } from '../../test/objects_mothers/auth/auth_mother'
import { PasswordMother } from '../../test/objects_mothers/shared/password_mother'
import { UserMother } from '../../test/objects_mothers/users/user_mother'
import { AuthUserDto } from '../shared/auth_user_dto'
import { RegisterAuthController } from './register-auth.controller'
import { RegisterAuthService } from './register-auth.service'

describe( 'RegisterAuthController', () => {
	let controller: RegisterAuthController
	let service: RegisterAuthService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ RegisterAuthController ],
			imports    : [ i18nModule ],
			providers  : [
				TranslationService,
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

		controller = module.get<RegisterAuthController>( RegisterAuthController )
		service    = module.get<RegisterAuthService>( RegisterAuthService )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )

	it( 'should return token when registered ', async () => {
		const p1 = PasswordMother.random()
		const a1 = AuthMother.random()
		const u1 = UserMother.random( a1.id )

		const dto = plainToInstance( AuthUserDto, {
			rut  : u1.rut.value,
			email: u1.email.value,
			role : u1.role.value,
			name : u1.name.value
		} )

		const errors = await validate( dto )

		jest.spyOn( service, 'register' )
		    .mockResolvedValue( a1 )
		const result = await controller.register( p1.value, dto )

		expect( result.statusCode ).toBe(200)
		expect( errors ).toHaveLength(0)
		expect( result.data ).toBe( a1.token.value )
		expect( service.register ).toHaveBeenCalledWith( dto, p1.value )
	} )

	it( 'should return error when register fails ', async () => {
		const p1     = PasswordMother.random()
		const dto    = plainToInstance( AuthUserDto, {
			rut  : '',
			email: '',
			role : '',
			name : ''
		} )
		const errors = await validate( dto )

		const result = await controller.register( p1.value, dto )

		expect( errors.length ).toBeGreaterThan(0)
		expect( result.statusCode ).toBe( 400 )
	} )
} )
