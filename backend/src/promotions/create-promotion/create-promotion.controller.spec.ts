import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { CreatePromotionController } from './create-promotion.controller'
import { CreatePromotionService } from './create-promotion.service'

describe( 'CreatePromotionController', () => {
	let controller: CreatePromotionController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ CreatePromotionController ],
			providers  : [ CreatePromotionService ]
		} )
		                                        .compile()

		controller =
			module.get<CreatePromotionController>( CreatePromotionController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
