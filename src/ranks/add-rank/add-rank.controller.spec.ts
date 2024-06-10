import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { AddRankController } from './add-rank.controller'
import { AddRankService } from './add-rank.service'

describe( 'AddRankController', () => {
	let controller: AddRankController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ AddRankController ],
			providers  : [ AddRankService ]
		} )
		                                        .compile()

		controller = module.get<AddRankController>( AddRankController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
