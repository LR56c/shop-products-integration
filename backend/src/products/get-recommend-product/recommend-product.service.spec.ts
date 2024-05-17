import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { RecommendProductService } from 'src/products/get-recommend-product/recommend-product.service'

describe( 'RecommendProductService', () => {
	let service: RecommendProductService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ RecommendProductService ]
		} )
		                                        .compile()

		service = module.get<RecommendProductService>( RecommendProductService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
