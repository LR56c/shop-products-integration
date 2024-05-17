import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { CreatePromotionService } from './create-promotion.service'

describe( 'CreatePromotionService', () => {
	let service: CreatePromotionService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ CreatePromotionService ]
		} )
		                                        .compile()

		service = module.get<CreatePromotionService>( CreatePromotionService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
