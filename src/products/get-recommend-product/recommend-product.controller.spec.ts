import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { RecommendProductController } from './recommend-product.controller'
import { RecommendProductService } from './recommend-product.service'

describe( 'RecommendProductController', () => {
	let controller: RecommendProductController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ RecommendProductController ],
			providers  : [ RecommendProductService ]
		} )
		                                        .compile()

		controller =
			module.get<RecommendProductController>( RecommendProductController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
