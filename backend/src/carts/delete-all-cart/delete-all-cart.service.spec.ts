import {
  Test,
  TestingModule
} from '@nestjs/testing'
import { DeleteAllCartService } from './delete-all-cart.service'

describe( 'DeleteAllCartService', () => {
	let service: DeleteAllCartService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ DeleteAllCartService ]
		} )
		                                        .compile()

		service = module.get<DeleteAllCartService>( DeleteAllCartService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
