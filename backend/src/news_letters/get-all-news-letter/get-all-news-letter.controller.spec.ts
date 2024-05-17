import {
  Test,
  TestingModule
} from '@nestjs/testing'
import { GetAllNewsLetterController } from './get-all-news-letter.controller'
import { GetAllNewsLetterService } from './get-all-news-letter.service'

describe( 'GetAllNewsLetterController', () => {
	let controller: GetAllNewsLetterController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ GetAllNewsLetterController ],
			providers  : [ GetAllNewsLetterService ]
		} )
		                                        .compile()

		controller =
			module.get<GetAllNewsLetterController>( GetAllNewsLetterController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
