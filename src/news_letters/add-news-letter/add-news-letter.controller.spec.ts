import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { AddNewsLetterController } from './add-news-letter.controller'
import { AddNewsLetterService } from './add-news-letter.service'

describe( 'AddNewsLetterController', () => {
	let controller: AddNewsLetterController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ AddNewsLetterController ],
			providers  : [ AddNewsLetterService ]
		} )
		                                        .compile()

		controller = module.get<AddNewsLetterController>( AddNewsLetterController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
