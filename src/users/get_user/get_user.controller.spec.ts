import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetUserController } from './get_user.controller'
import { GetUserService } from './get_user.service'

describe( 'GetUserController', () => {
	let controller: GetUserController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ GetUserController ],
			providers  : [ GetUserService ]
		} )
		                                        .compile()

		controller = module.get<GetUserController>( GetUserController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
