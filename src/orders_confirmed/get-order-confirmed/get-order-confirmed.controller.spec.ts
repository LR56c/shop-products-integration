import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetOrderConfirmedController } from './get-order-confirmed.controller'
import { GetOrderConfirmedService } from './get-order-confirmed.service'

describe( 'GetOrderConfirmedController', () => {
	let controller: GetOrderConfirmedController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ GetOrderConfirmedController ],
			providers  : [ GetOrderConfirmedService ]
		} )
		                                        .compile()

		controller =
			module.get<GetOrderConfirmedController>( GetOrderConfirmedController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
