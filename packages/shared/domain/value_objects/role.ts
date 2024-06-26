import { z } from 'zod'
import { InvalidRoleException } from '../exceptions/InvalidRoleException'

export enum RoleEnum {
	ADMIN       = 'ADMIN',
	SHOP_KEEPER = 'SHOPKEEPER',
	CLIENT      = 'CLIENT',
	ACCOUNTANT  = 'ACCOUNTANT',
	SELLER      = 'SELLER',
}

const RoleSchema = z.nativeEnum( RoleEnum )

export class Role {
	readonly value: RoleEnum

	private constructor( value: RoleEnum ) {
		this.value = value
	}

	static from( value: string ): Role {
		const parseValue = RoleSchema.safeParse( value )
		if ( !parseValue.success ) {
			throw new InvalidRoleException()
		}
		return new Role( parseValue.data )
	}
}
