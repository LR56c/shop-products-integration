import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { DeleteProductController } from './delete-product.controller'
import { DeleteProductService } from './delete-product.service'

describe( 'DeleteProductController', () => {
	let controller: DeleteProductController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ DeleteProductController ],
			providers  : [ DeleteProductService ]
		} )
		                                        .compile()

		controller = module.get<DeleteProductController>( DeleteProductController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
