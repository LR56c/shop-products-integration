import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { DeleteCartService } from './delete-cart.service'

describe( 'DeleteCartService', () => {
	let service: DeleteCartService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ DeleteCartService ]
		} )
		                                        .compile()

		service = module.get<DeleteCartService>( DeleteCartService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
