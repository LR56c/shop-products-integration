import { Errors } from '../../../../packages/shared/domain/exceptions/errors'
import { DeleteAuth } from '../../../../packages/auth/application/delete_auth'
import { AuthMockData } from '../../mock/auth_mock_data'
import { AuthMother } from '../../objects_mothers/auth/auth_mother'

describe( 'DeleteAuthUnitTest', () => {

	it( 'delete auth', async () => {
		const a1   = AuthMother.random()
		const repo = new AuthMockData( [] )

		console.log( 'input delete:', a1 )

		const result = await DeleteAuth( repo, a1.id.value )

		repo.assertDeleteHasBeenCalledWith( a1.id )
		expect( result ).toBe( true )
	} )

	it( 'try delete auth with invalid inputs', async () => {
		const repo = new AuthMockData( [] )

		const result = await DeleteAuth( repo, '' )

		if( result instanceof Errors ) {
			const errors = result.values.map( e => e.name)
			console.log('error:', errors)
		}
		expect( result ).toBeInstanceOf(Errors)
	} )
} )
