import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { CreateItemConfirmedService } from './create-item-confirmed.service'

describe( 'CreateItemConfirmedService', () => {
	let service: CreateItemConfirmedService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ CreateItemConfirmedService ]
		} )
		                                        .compile()

		service =
			module.get<CreateItemConfirmedService>( CreateItemConfirmedService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
