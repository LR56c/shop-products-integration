import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetAllOrderConfirmedController } from './get-all-order-confirmed.controller'
import { GetAllOrderConfirmedService } from './get-all-order-confirmed.service'

describe( 'GetAllOrderConfirmedController', () => {
	let controller: GetAllOrderConfirmedController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ GetAllOrderConfirmedController ],
			providers  : [ GetAllOrderConfirmedService ]
		} )
		                                        .compile()

		controller = module.get<GetAllOrderConfirmedController>(
			GetAllOrderConfirmedController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
