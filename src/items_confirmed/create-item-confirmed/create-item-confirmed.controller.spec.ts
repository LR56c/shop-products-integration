import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { CreateItemConfirmedController } from './create-item-confirmed.controller'
import { CreateItemConfirmedService } from './create-item-confirmed.service'

describe( 'CreateItemConfirmedController', () => {
	let controller: CreateItemConfirmedController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ CreateItemConfirmedController ],
			providers  : [ CreateItemConfirmedService ]
		} )
		                                        .compile()

		controller = module.get<CreateItemConfirmedController>(
			CreateItemConfirmedController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
