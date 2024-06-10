import { Errors } from '../../../../packages/shared/domain/exceptions/errors'
import { UUIDMother } from '../../objects_mothers/shared/uuid_mother'
import { UserMother } from '../../objects_mothers/users/user_mother'
import { GetOneUser } from '../../../../packages/user/application/get_one_user'
import { UserMockData } from '../../mock/user_mock_data'

describe( 'GetOneUserUnitTest', () => {

	it( 'get one user', async () => {
		const u1 = UserMother.random(UUIDMother.random())
		const repo = new UserMockData([u1])
		console.log('input get one:', u1.email)

		const result = await GetOneUser( repo, u1.email.value)

		repo.assertGetOneHasBeenCalledWith( u1.email)
		expect( result ).toBe( u1 )
	} )

	it( 'try get one user with invalid inputs', async () => {
		const repo = new UserMockData([])

		const result = await GetOneUser( repo, '')

		if( result instanceof Errors ) {
			const errors = result.values.map( e => e.name)
			console.log('error:', errors)
		}
		expect( result ).toBeInstanceOf(Errors)
	} )
} )
