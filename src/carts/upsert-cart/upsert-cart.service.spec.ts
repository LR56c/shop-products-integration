import {
  Test,
  TestingModule
} from '@nestjs/testing'
import { UpsertCartService } from './upsert-cart.service'

describe( 'UpsertCartService', () => {
	let service: UpsertCartService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ UpsertCartService ]
		} )
		                                        .compile()

		service = module.get<UpsertCartService>( UpsertCartService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
