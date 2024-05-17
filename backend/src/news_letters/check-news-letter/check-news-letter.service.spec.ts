import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { CheckNewsLetterService } from './check-news-letter.service'

describe( 'CheckNewsLetterService', () => {
	let service: CheckNewsLetterService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ CheckNewsLetterService ]
		} )
		                                        .compile()

		service = module.get<CheckNewsLetterService>( CheckNewsLetterService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
