import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { LoginAuthService } from './login-auth.service'

describe( 'LoginAuthService', () => {
	let service: LoginAuthService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ LoginAuthService ]
		} )
		                                        .compile()

		service = module.get<LoginAuthService>( LoginAuthService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
