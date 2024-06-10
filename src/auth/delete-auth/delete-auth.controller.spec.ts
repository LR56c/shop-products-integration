import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { DeleteAuthController } from './delete-auth.controller'
import { DeleteAuthService } from './delete-auth.service'

describe( 'DeleteAuthController', () => {
	let controller: DeleteAuthController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ DeleteAuthController ],
			providers  : [ DeleteAuthService ]
		} )
		                                        .compile()

		controller = module.get<DeleteAuthController>( DeleteAuthController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
