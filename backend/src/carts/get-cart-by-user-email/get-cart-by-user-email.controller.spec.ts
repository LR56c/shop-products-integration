import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetCartByUserEmailController } from './get-cart-by-user-email.controller'
import { GetCartByUserEmailService } from './get-cart-by-user-email.service'

describe( 'GetCartByUserEmailController', () => {
	let controller: GetCartByUserEmailController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ GetCartByUserEmailController ],
			providers  : [ GetCartByUserEmailService ]
		} )
		                                        .compile()

		controller =
			module.get<GetCartByUserEmailController>( GetCartByUserEmailController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
