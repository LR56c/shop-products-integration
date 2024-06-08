import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { AddNewsLetterService } from './add-news-letter.service'

describe( 'AddNewsLetterService', () => {
	let service: AddNewsLetterService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ AddNewsLetterService ]
		} )
		                                        .compile()

		service = module.get<AddNewsLetterService>( AddNewsLetterService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
