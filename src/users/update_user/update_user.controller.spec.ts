import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { UpdateUserController } from './update_user.controller'
import { UpdateUserService } from './update_user.service'

describe( 'UpdateUserController', () => {
	let controller: UpdateUserController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ UpdateUserController ],
			providers  : [ UpdateUserService ]
		} )
		                                        .compile()

		controller = module.get<UpdateUserController>( UpdateUserController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
