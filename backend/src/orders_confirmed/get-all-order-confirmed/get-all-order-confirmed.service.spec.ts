import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetAllOrderConfirmedService } from './get-all-order-confirmed.service'

describe( 'GetAllOrderConfirmedService', () => {
	let service: GetAllOrderConfirmedService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ GetAllOrderConfirmedService ]
		} )
		                                        .compile()

		service =
			module.get<GetAllOrderConfirmedService>( GetAllOrderConfirmedService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
