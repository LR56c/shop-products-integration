import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetAllOrdersService } from './get-all-orders.service'

describe( 'GetAllOrdersService', () => {
	let service: GetAllOrdersService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ GetAllOrdersService ]
		} )
		                                        .compile()

		service = module.get<GetAllOrdersService>( GetAllOrdersService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
