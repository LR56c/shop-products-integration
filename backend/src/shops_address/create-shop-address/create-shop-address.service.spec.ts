import {
	Test,
	TestingModule
} from '@nestjs/testing'
import { CreateShopAddressService } from './create-shop-address.service'

describe( 'CreateShopAddressService', () => {
	let service: CreateShopAddressService

	beforeEach( async () => {
		const module: TestingModule = await Test.createTestingModule( {
			providers: [ CreateShopAddressService ]
		} )
		                                        .compile()

		service = module.get<CreateShopAddressService>( CreateShopAddressService )
	} )

	it( 'should be defined', () => {
		expect( service )
			.toBeDefined()
	} )
} )
