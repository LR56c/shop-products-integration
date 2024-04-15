import { z } from 'zod'

enum RoleEnum {
	ADMIN       = 'admin',
	SHOP_KEEPER = 'shop_keeper',
	CLIENT      = 'client',
	ACCOUNTANT  = 'accountant',
	SELLER      = 'seller',
}

const RoleSchema = z.nativeEnum(RoleEnum)

export class Role {
	private readonly value: RoleEnum

	private constructor( value: RoleEnum ) {
		this.value = value
	}

	static from( value: string ): Role {
		const parseValue = RoleSchema.safeParse( value )
		if ( !parseValue.success ) {
			throw new Error( 'Invalid role' )
		}
		return new Role( parseValue.data )
	}
}
