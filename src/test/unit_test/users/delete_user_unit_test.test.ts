import { Errors } from '../../../../packages/shared/domain/exceptions/errors'
import { EmailMother } from '../../objects_mothers/shared/email_mother'
import { DeleteUser } from '../../../../packages/user/application/delete_user'
import { UserMockData } from '../../mock/user_mock_data'

describe( 'DeleteUserUnitTest', () => {

	it( 'delete an user', async () => {
		const repo = new UserMockData([])
		const e1 = EmailMother.random()
		console.log('input delete:', e1.value)

		const result = await DeleteUser( repo, e1.value)

		repo.assertDeletedHasBeenCalledWith( e1)
		expect( result ).toBe( true )
	} )

	it( 'try delete an user with invalid inputs', async () => {
		const repo = new UserMockData([])

		const result = await DeleteUser( repo, '')

		if( result instanceof Errors ) {
			const errors = result.values.map( e => e.name)
			console.log('error:', errors)
		}
		expect( result ).toBeInstanceOf(Errors)
	} )
} )
