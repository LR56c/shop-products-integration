import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { ApplyAverageRankToProductService } from 'src/products/shared/services/calculate-average-rank-product/apply-average-rank-to-product.service'

describe( 'CalculateAverageRankProductService', () => {
	let service: ApplyAverageRankToProductService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ ApplyAverageRankToProductService ]
		} )
		                                        .compile()

		service = module.get<ApplyAverageRankToProductService>(
			ApplyAverageRankToProductService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
