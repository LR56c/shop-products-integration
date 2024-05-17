import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetAllSaleController } from './get-all-sale.controller'
import { GetAllSaleService } from './get-all-sale.service'

describe( 'GetAllSaleController', () => {
	let controller: GetAllSaleController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ GetAllSaleController ],
			providers  : [ GetAllSaleService ]
		} )
		                                        .compile()

		controller = module.get<GetAllSaleController>( GetAllSaleController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
