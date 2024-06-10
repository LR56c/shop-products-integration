import { Errors } from '../../../../packages/shared/domain/exceptions/errors'
import { ValidInteger } from '../../../../packages/shared/domain/value_objects/valid_integer'
import { GetUser } from '../../../../packages/user/application/get_user'
import { UserMockData } from '../../mock/user_mock_data'
import { UUIDMother } from '../../objects_mothers/shared/uuid_mother'
import { UserMother } from '../../objects_mothers/users/user_mother'

describe( 'GetAllUserUnitTest', () => {

	it( 'get all users', async () => {
		const u1 = UserMother.random(UUIDMother.random())
		const u2 = UserMother.random(UUIDMother.random())
		const db = [u1, u2]
		const repo = new UserMockData(db)

		const from = ValidInteger.from(0)
		const to = ValidInteger.from(2)
		const role = undefined
		const name = undefined

		console.log('input get all:', from, to, role, name)
		const result = await GetUser( repo,{
			from: from.value,
			to: to.value,
			role,
			name
		} )

		repo.assertGetAllHasBeenCalledWith( from, to)
		expect( result ).toHaveLength(2)
		expect( result ).toBe( db )
	} )

	it( 'try get all users with invalid inputs', async () => {
		const repo = new UserMockData([])

		const result = await GetUser( repo, {
			from: -1,
			to: -10,
			role: undefined,
			name: undefined
		} )

		if( result instanceof Errors ) {
			const errors = result.values.map( e => e.name)
			console.log('error:', errors)
		}
		expect( result ).toBeInstanceOf(Errors)
	} )
} )
