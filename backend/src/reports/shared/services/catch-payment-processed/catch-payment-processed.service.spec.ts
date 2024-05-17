import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { CatchPaymentProcessedService } from './catch-payment-processed.service'

describe( 'CatchPaymentProcessedService', () => {
	let service: CatchPaymentProcessedService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ CatchPaymentProcessedService ]
		} )
		                                        .compile()

		service =
			module.get<CatchPaymentProcessedService>( CatchPaymentProcessedService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
