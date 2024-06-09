import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetAllRankByCodeService } from './get-all-rank-by-code.service'

describe( 'GetAllRankByCodeService', () => {
	let service: GetAllRankByCodeService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ GetAllRankByCodeService ]
		} )
		                                        .compile()

		service = module.get<GetAllRankByCodeService>( GetAllRankByCodeService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
