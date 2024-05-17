import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { DeleteOrderConfirmedController } from './delete-order-confirmed.controller'
import { DeleteOrderConfirmedService } from './delete-order-confirmed.service'

describe( 'DeleteOrderConfirmedController', () => {
	let controller: DeleteOrderConfirmedController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ DeleteOrderConfirmedController ],
			providers  : [ DeleteOrderConfirmedService ]
		} )
		                                        .compile()

		controller = module.get<DeleteOrderConfirmedController>(
			DeleteOrderConfirmedController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
