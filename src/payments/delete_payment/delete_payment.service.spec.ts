import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { DeletePaymentService } from './delete_payment.service'

describe( 'DeletePaymentService', () => {
	let service: DeletePaymentService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ DeletePaymentService ]
		} )
		                                        .compile()

		service = module.get<DeletePaymentService>( DeletePaymentService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
