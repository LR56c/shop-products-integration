import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { GetShopAddressController } from './get-shop-address.controller'
import { GetShopAddressService } from './get-shop-address.service'

describe( 'GetShopAddressController', () => {
	let controller: GetShopAddressController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ GetShopAddressController ],
			providers  : [ GetShopAddressService ]
		} )
		                                        .compile()

		controller =
			module.get<GetShopAddressController>( GetShopAddressController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
