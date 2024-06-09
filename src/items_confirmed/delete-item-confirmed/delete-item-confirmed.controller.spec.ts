import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { DeleteItemConfirmedController } from './delete-item-confirmed.controller'
import { DeleteItemConfirmedService } from './delete-item-confirmed.service'

describe( 'DeleteItemConfirmedController', () => {
	let controller: DeleteItemConfirmedController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ DeleteItemConfirmedController ],
			providers  : [ DeleteItemConfirmedService ]
		} )
		                                        .compile()

		controller = module.get<DeleteItemConfirmedController>(
			DeleteItemConfirmedController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
