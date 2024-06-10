import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { UpdateRankController } from './update-rank.controller'
import { UpdateRankService } from './update-rank.service'

describe( 'UpdateRankController', () => {
	let controller: UpdateRankController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ UpdateRankController ],
			providers  : [ UpdateRankService ]
		} )
		                                        .compile()

		controller = module.get<UpdateRankController>( UpdateRankController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
