import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetAllItemConfirmedService } from './get-all-item-confirmed.service'

describe( 'GetAllItemConfirmedService', () => {
	let service: GetAllItemConfirmedService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ GetAllItemConfirmedService ]
		} )
		                                        .compile()

		service =
			module.get<GetAllItemConfirmedService>( GetAllItemConfirmedService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
