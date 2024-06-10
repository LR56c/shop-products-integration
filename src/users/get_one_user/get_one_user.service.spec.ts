import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetOneUserService } from './get_one_user.service'

describe( 'GetOneUserService', () => {
	let service: GetOneUserService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ GetOneUserService ]
		} )
		                                        .compile()

		service = module.get<GetOneUserService>( GetOneUserService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
