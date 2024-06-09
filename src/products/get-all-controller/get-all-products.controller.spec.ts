import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetAllProductsController } from 'src/products/get-all-controller/get-all-products.controller'
import { GetAllProductsService } from 'src/products/get-all-controller/get-all-products.service'

describe( 'GetAllProductsController', () => {
	let controller: GetAllProductsController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ GetAllProductsController ],
			providers  : [ GetAllProductsService ]
		} )
		                                        .compile()

		controller =
			module.get<GetAllProductsController>( GetAllProductsController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
