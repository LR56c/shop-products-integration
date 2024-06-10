import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { UpdatePaymentService } from './update_payment.service'

describe( 'UpdatePaymentService', () => {
	let service: UpdatePaymentService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ UpdatePaymentService ]
		} )
		                                        .compile()

		service = module.get<UpdatePaymentService>( UpdatePaymentService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
