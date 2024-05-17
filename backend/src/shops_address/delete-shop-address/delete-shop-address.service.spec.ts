import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { DeleteShopAddressService } from './delete-shop-address.service'

describe( 'DeleteShopAddressService', () => {
	let service: DeleteShopAddressService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ DeleteShopAddressService ]
		} )
		                                        .compile()

		service = module.get<DeleteShopAddressService>( DeleteShopAddressService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
