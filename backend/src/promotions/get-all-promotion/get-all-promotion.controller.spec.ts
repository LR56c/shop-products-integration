import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetAllPromotionController } from './get-all-promotion.controller'
import { GetAllPromotionService } from './get-all-promotion.service'

describe( 'GetAllPromotionController', () => {
	let controller: GetAllPromotionController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ GetAllPromotionController ],
			providers  : [ GetAllPromotionService ]
		} )
		                                        .compile()

		controller =
			module.get<GetAllPromotionController>( GetAllPromotionController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
