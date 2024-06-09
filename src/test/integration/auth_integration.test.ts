import { BaseException } from '../../../packages/shared/domain/exceptions/BaseException'
import { wrapTypeAsync } from '../../../packages/shared/utils/wrap_type'
import { AuthMother } from '../objects_mothers/auth/auth_mother'
import { AuthRepository } from '../../../packages/auth/domain/auth_repository'
import { AuthMemoryData } from '../../../packages/auth/infrastructure/auth_memory_data'
import { EmailMother } from '../objects_mothers/shared/email_mother'
import { PasswordMother } from '../objects_mothers/shared/password_mother'

describe( 'Auth Repository', () => {
	let repo: AuthRepository

	it( 'should be registered', async () => {
		//AAA (Arrange, Act, Assert)
		repo = new AuthMemoryData([])
		const email    = EmailMother.random()
		const password = PasswordMother.random()
		console.log('should be registered')
		console.log( 'inputs:', email, password )

		const result = await repo.register( email, password )

		const auth = await repo.login( email, password )

		//Assert
		expect( result ).toEqual( auth )
	} )

	it( 'should throw error if already registered', async () => {
		const email    = EmailMother.random()
		const password = PasswordMother.random()
		const auth = AuthMother.random()
		repo = new AuthMemoryData([
			{ email, password, auth }
		])
		console.log('should throw error if already registered')
		console.log( 'inputs:', email, password )

		const result = await wrapTypeAsync(()=> repo.register( email, password ))

		expect(result).toBeInstanceOf(BaseException)
	} )

	it( 'should recover token', async () => {
		const email    = EmailMother.random()
		const password = PasswordMother.random()
		const auth = AuthMother.random()
		repo = new AuthMemoryData([
			{ email, password, auth }
		])
		console.log('should recover token')
		console.log( 'inputs:', email, password )

		const result = await repo.recover(auth.token)

		expect( result.token ).not.toEqual( auth.token )
	} )

	it( 'should delete user', async () => {
		const email    = EmailMother.random()
		const password = PasswordMother.random()
		const auth = AuthMother.random()
		repo = new AuthMemoryData([
			{ email, password, auth }
		])
		console.log('should delete user')
		console.log( 'inputs:', email, password )
		await repo.delete(auth.id)

		const result = await wrapTypeAsync(()=> repo.login( email, password ))

		expect(result).toBeInstanceOf(BaseException)
	} )
} )
