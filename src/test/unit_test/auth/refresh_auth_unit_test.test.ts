import { Errors } from '../../../../packages/shared/domain/exceptions/errors'
import { RecoverAuth } from '../../../../packages/auth/application/recover_auth'
import { AuthMockData } from '../../mock/auth_mock_data'
import { AuthMother } from '../../objects_mothers/auth/auth_mother'

describe( 'RefreshAuthUnitTest', () => {

	it( 'recover token an user', async () => {
		const auth1 = AuthMother.random()
		const repo  = new AuthMockData( [ auth1 ] )

		console.log( 'input recover:', auth1 )
		const result = await RecoverAuth( repo, auth1.token.value )

		console.log( 'result auth:', result )
		repo.assertRecoverHasBeenCalledWith( auth1.token )
		expect( result ).not.toBe( auth1 )
	} )

	it( 'try recover token an user with invalid inputs', async () => {
		const repo = new AuthMockData( [] )

		const result = await RecoverAuth( repo, '' )

		if( result instanceof Errors ) {
			const errors = result.values.map( e => e.name)
			console.log('error:', errors)
		}
		expect( result ).toBeInstanceOf( Errors )
	} )
} )
