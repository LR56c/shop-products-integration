import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { RemoveNewsLetterService } from './remove-news-letter.service'

describe( 'RemoveNewsLetterService', () => {
	let service: RemoveNewsLetterService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ RemoveNewsLetterService ]
		} )
		                                        .compile()

		service = module.get<RemoveNewsLetterService>( RemoveNewsLetterService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
