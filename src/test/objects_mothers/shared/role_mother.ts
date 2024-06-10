import { faker } from '@faker-js/faker'
import { Role } from '../../../../packages/shared/domain/value_objects/role'

export class RoleMother {
	static random(): Role {
		return Role.from( faker.helpers.arrayElement( roles ) )
	}

	static invalid(): Role {
		return Role.from( '' )
	}
}

const roles = [
	'ADMIN',
	'SHOPKEEPER',
	'CLIENT',
	'ACCOUNTANT',
	'SELLER'
]
