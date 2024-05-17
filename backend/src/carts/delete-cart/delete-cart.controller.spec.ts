import {
  Test,
  TestingModule
} from '@nestjs/testing'
import { DeleteCartController } from './delete-cart.controller'
import { DeleteCartService } from './delete-cart.service'

describe( 'DeleteCartController', () => {
	let controller: DeleteCartController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ DeleteCartController ],
			providers  : [ DeleteCartService ]
		} )
		                                        .compile()

		controller = module.get<DeleteCartController>( DeleteCartController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
