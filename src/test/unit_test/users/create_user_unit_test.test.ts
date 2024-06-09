import { Errors } from '../../../../packages/shared/domain/exceptions/errors'
import { CreateUser } from '../../../../packages/user/application/create_user'
import { UserMockData } from '../../mock/user_mock_data'
import { UUIDMother } from '../../objects_mothers/shared/uuid_mother'
import { UserMother } from '../../objects_mothers/users/user_mother'

describe( 'CreateUserUnitTest', () => {

	it( 'create an user', async () => {
	const repo = new UserMockData([])
		const auth1 = UUIDMother.random()
		const u1    = UserMother.random( auth1 )

		console.log('input create:', u1)
		const result = await CreateUser( repo, {
			authId: u1.auth_id.value,
			rut   : u1.rut.value,
			name  : u1.name.value,
			email : u1.email.value,
			role  : u1.role.value
		} )

		repo.assertCreatedHasBeenCalledWith( u1)
		expect( result ).toBe( true )
	} )

	it( 'try create an user with invalid inputs', async () => {
		const repo = new UserMockData([])

		const result = await CreateUser( repo, {
			authId: '',
			rut   : '',
			name  : '',
			email : '',
			role  : ''
		} )

		if( result instanceof Errors ) {
			const errors = result.values.map( e => e.name)
			console.log('error:', errors)
		}
		expect( result ).toBeInstanceOf(Errors)
	} )
} )
