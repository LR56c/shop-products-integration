import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetCategoriesController } from './get-categories.controller'
import { GetCategoriesService } from './get-categories.service'

describe( 'GetCategoriesController', () => {
	let controller: GetCategoriesController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ GetCategoriesController ],
			providers  : [ GetCategoriesService ]
		} )
		                                        .compile()

		controller = module.get<GetCategoriesController>( GetCategoriesController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
