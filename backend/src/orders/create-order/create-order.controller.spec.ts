import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { CreateOrderController } from './create-order.controller'
import { CreateOrderService } from './create-order.service'

describe( 'CreateOrderController', () => {
	let controller: CreateOrderController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ CreateOrderController ],
			providers  : [ CreateOrderService ]
		} )
		                                        .compile()

		controller = module.get<CreateOrderController>( CreateOrderController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
