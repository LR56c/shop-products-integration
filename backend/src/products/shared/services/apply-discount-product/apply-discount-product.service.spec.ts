import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { ApplyDiscountProductService } from './apply-discount-product.service'

describe( 'ApplyDiscountProductService', () => {
	let service: ApplyDiscountProductService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ ApplyDiscountProductService ]
		} )
		                                        .compile()

		service =
			module.get<ApplyDiscountProductService>( ApplyDiscountProductService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
