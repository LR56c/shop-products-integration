import {
  Test,
  TestingModule
} from '@nestjs/testing'
import { GetCartByUserEmailService } from './get-cart-by-user-email.service'

describe( 'GetCartByUserEmailService', () => {
	let service: GetCartByUserEmailService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ GetCartByUserEmailService ]
		} )
		                                        .compile()

		service =
			module.get<GetCartByUserEmailService>( GetCartByUserEmailService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
