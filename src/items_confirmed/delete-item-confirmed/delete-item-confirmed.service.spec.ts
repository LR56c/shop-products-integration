import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { DeleteItemConfirmedService } from './delete-item-confirmed.service'

describe( 'DeleteItemConfirmedService', () => {
	let service: DeleteItemConfirmedService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ DeleteItemConfirmedService ]
		} )
		                                        .compile()

		service =
			module.get<DeleteItemConfirmedService>( DeleteItemConfirmedService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
