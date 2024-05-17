import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetOrderService } from './get-order.service'

describe( 'GetOrderService', () => {
	let service: GetOrderService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ GetOrderService ]
		} )
		                                        .compile()

		service = module.get<GetOrderService>( GetOrderService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
