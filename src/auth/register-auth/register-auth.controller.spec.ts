import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { RegisterAuthController } from './register-auth.controller'
import { RegisterAuthService } from './register-auth.service'

describe( 'RegisterAuthController', () => {
	let controller: RegisterAuthController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ RegisterAuthController ],
			providers  : [ RegisterAuthService ]
		} )
		                                        .compile()

		controller = module.get<RegisterAuthController>( RegisterAuthController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
