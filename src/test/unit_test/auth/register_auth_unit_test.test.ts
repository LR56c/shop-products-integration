import { Errors } from '../../../../packages/shared/domain/exceptions/errors'
import { RegisterAuth } from '../../../../packages/auth/application/register_auth'
import { AuthMockData } from '../../mock/auth_mock_data'
import { AuthMother } from '../../objects_mothers/auth/auth_mother'
import { PasswordMother } from '../../objects_mothers/shared/password_mother'
import { UserMother } from '../../objects_mothers/users/user_mother'

describe( 'RegisterAuthUnitTest', () => {

	it( 'register an user', async () => {
		const auth1 = AuthMother.random()
		const u1    = UserMother.random( auth1.id )
		const p1    = PasswordMother.random()
		const repo  = new AuthMockData( [ auth1 ] )

		console.log( 'input auth register:', auth1 )
		console.log( 'input user register:', u1 )
		console.log( 'input password register:', p1 )
		const result = await RegisterAuth( repo, u1.email.value, p1.value )

		console.log( 'result auth:', result )
		repo.assertRegisterHasBeenCalledWith( u1.email, p1 )
		expect( result ).toBe( auth1 )
	} )

	it( 'try register an user with invalid inputs', async () => {
		const repo = new AuthMockData( [] )

		const result = await RegisterAuth( repo, '', '')

		if( result instanceof Errors ) {
			const errors = result.values.map( e => e.name)
			console.log('error:', errors)
		}
		expect( result ).toBeInstanceOf( Errors )
	} )
} )
