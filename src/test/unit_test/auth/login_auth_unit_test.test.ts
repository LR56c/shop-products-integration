import { Errors } from '../../../../packages/shared/domain/exceptions/errors'
import { PasswordMother } from '../../objects_mothers/shared/password_mother'
import { LoginAuth } from '../../../../packages/auth/application/login_auth'
import { AuthMockData } from '../../mock/auth_mock_data'
import { AuthMother } from '../../objects_mothers/auth/auth_mother'
import { UserMother } from '../../objects_mothers/users/user_mother'

describe( 'LoginAuthUnitTest', () => {

	it( 'login auth', async () => {
		const a1   = AuthMother.random()
		const u1   = UserMother.random(a1.id)
		const p1   = PasswordMother.random()
		const repo = new AuthMockData( [a1] )

		console.log( 'input login:', a1 )

		const result = await LoginAuth( repo, u1.email.value, p1.value)

		repo.assertLoginHasBeenCalledWith( u1.email, p1)
		expect( result ).toBe( a1 )
	} )
	it( 'login auth with invalid inputs', async () => {
		const repo = new AuthMockData( [] )

		const result = await LoginAuth( repo, '', '')

		if( result instanceof Errors ) {
			const errors = result.values.map( e => e.name)
			console.log('error:', errors)
		}
		expect( result ).toBeInstanceOf( Errors )
	} )
} )
