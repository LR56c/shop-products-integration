import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { DeleteProductService } from './delete-product.service'

describe( 'DeleteProductService', () => {
	let service: DeleteProductService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ DeleteProductService ]
		} )
		                                        .compile()

		service = module.get<DeleteProductService>( DeleteProductService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
