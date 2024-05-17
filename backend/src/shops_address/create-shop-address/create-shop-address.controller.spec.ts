import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { CreateShopAddressController } from './create-shop-address.controller'
import { CreateShopAddressService } from './create-shop-address.service'

describe( 'CreateShopAddressController', () => {
	let controller: CreateShopAddressController

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			controllers: [ CreateShopAddressController ],
			providers  : [ CreateShopAddressService ]
		} )
		                                        .compile()

		controller =
			module.get<CreateShopAddressController>( CreateShopAddressController )
	} )

	it( 'should be defined', () => {
		expect( controller )
			.toBeDefined()
	} )
} )
