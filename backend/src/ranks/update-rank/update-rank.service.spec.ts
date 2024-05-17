import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { UpdateRankService } from './update-rank.service'

describe( 'UpdateRankService', () => {
	let service: UpdateRankService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ UpdateRankService ]
		} )
		                                        .compile()

		service = module.get<UpdateRankService>( UpdateRankService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
