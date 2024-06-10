import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { DeleteCategoriesService } from './delete-categories.service'

describe( 'DeleteCategoriesService', () => {
	let service: DeleteCategoriesService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ DeleteCategoriesService ]
		} )
		                                        .compile()

		service = module.get<DeleteCategoriesService>( DeleteCategoriesService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
