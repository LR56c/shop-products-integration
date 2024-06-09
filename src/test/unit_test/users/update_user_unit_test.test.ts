import { Errors } from '../../../../packages/shared/domain/exceptions/errors'
import { User } from '../../../../packages/user/domain/models/User'
import { RoleMother } from '../../objects_mothers/shared/role_mother'
import { RUTMother } from '../../objects_mothers/shared/rut_mother'
import { ValidStringMother } from '../../objects_mothers/shared/valid_string_mother'
import { UpdateUser } from '../../../../packages/user/application/update_user'
import { UserMockData } from '../../mock/user_mock_data'
import { UUIDMother } from '../../objects_mothers/shared/uuid_mother'
import { UserMother } from '../../objects_mothers/users/user_mother'

describe( 'UpdateUserUnitTest', () => {

	it( 'update an full user', async () => {
		const repo = new UserMockData([])
		const auth1 = UUIDMother.random()
		const u1    = UserMother.random( auth1 )
		const updatedUser = new User(
			u1.auth_id,
			RUTMother.random(),
			ValidStringMother.random(),
			u1.email,
			RoleMother.random()
		)

		console.log('input original:', u1)
		console.log('input updater:', updatedUser)
		const result = await UpdateUser( repo, u1, {
			email: updatedUser.email.value,
			rut: updatedUser.rut.value,
			role: updatedUser.role.value,
			name: updatedUser.name.value
		} )

		repo.assertUpdateHasBeenCalledWith( u1.email, updatedUser)
		expect( result ).toBe( true )
	} )

	it( 'update an partial user', async () => {
		const repo = new UserMockData([])
		const auth1 = UUIDMother.random()
		const u1    = UserMother.random( auth1 )
		const updatedUser = new User(
			u1.auth_id,
			u1.rut,
			ValidStringMother.random(),
			u1.email,
			u1.role
		)

		console.log('input original:', u1)
		console.log('input updater:', updatedUser)
		const result = await UpdateUser( repo, u1, {
			name: updatedUser.name.value
		} )

		repo.assertUpdateHasBeenCalledWith( u1.email, updatedUser)
		expect( result ).toBe( true )
	} )

	it( 'try update an user with invalid inputs', async () => {
		const repo = new UserMockData([])
		const auth1 = UUIDMother.random()
		const u1    = UserMother.random( auth1 )

		const result = await UpdateUser( repo, u1, {
			email: '',
			rut: '',
			role: '',
			name: ''
		} )

		if( result instanceof Errors ) {
			const errors = result.values.map( e => e.name)
			console.log('error:', errors)
		}
		expect( result ).toBeInstanceOf(Errors)
	} )
} )
