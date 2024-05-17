import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetOrderController } from './get-order.controller'
import { GetOrderService } from './get-order.service'

describe( 'GetOrderController', () => {
	let controller: GetOrderController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ GetOrderController ],
			providers  : [ GetOrderService ]
		} )
		                                        .compile()

		controller = module.get<GetOrderController>( GetOrderController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
