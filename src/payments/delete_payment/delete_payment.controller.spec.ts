import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { DeletePaymentController } from './delete_payment.controller'
import { DeletePaymentService } from './delete_payment.service'

describe( 'DeletePaymentController', () => {
	let controller: DeletePaymentController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ DeletePaymentController ],
			providers  : [ DeletePaymentService ]
		} )
		                                        .compile()

		controller = module.get<DeletePaymentController>( DeletePaymentController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
