import { AuthRepository } from '~features/auth/domain/auth_repository'
import { AuthMother } from '../objects_mothers/auh/auth_mother'
import { PasswordMother } from '../objects_mothers/shared/password_mother'
import { UserMother } from '../objects_mothers/users/user_mother'
import { AuthMemoryData } from '~features/auth/infrastructure/auth_memory_data'

// login
// delete
// recover
// register
describe( 'News Letter Repository', () => {
	let repo: AuthRepository = new AuthMemoryData()

	// beforeEach( async () => {
	// } )

	it( 'should be defined', () => {
		expect( repo )
			.toBeDefined()
	} )

	it( 'shoudl be registered', async () => {
		//AAA (Arrange, Act, Assert)
		const auth1 = AuthMother.random()
		const user1 = UserMother.random(auth1.id)

		const result = await repo.register(user1.email, PasswordMother.random())

		// expect(re)
		expect(result).toEqual(auth1)
	} )
} )
