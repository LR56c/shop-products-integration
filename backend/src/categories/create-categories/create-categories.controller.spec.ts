import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { CreateCategoriesController } from './create-categories.controller'
import { CreateCategoriesService } from './create-categories.service'

describe( 'CreateCategoriesController', () => {
	let controller: CreateCategoriesController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ CreateCategoriesController ],
			providers  : [ CreateCategoriesService ]
		} )
		                                        .compile()

		controller =
			module.get<CreateCategoriesController>( CreateCategoriesController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
