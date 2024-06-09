import { RoleMother } from '../objects_mothers/shared/role_mother'
import { Role } from '../../../packages/shared/domain/value_objects/role'
import { User } from '../../../packages/user/domain/models/User'
import { EmailMother } from '../objects_mothers/shared/email_mother'
import { RUTMother } from '../objects_mothers/shared/rut_mother'
import { ValidStringMother } from '../objects_mothers/shared/valid_string_mother'
import { ValidInteger } from '../../../packages/shared/domain/value_objects/valid_integer'
import { UserDao } from '../../../packages/user/domain/dao/UserDao'
import { UserMemoryData } from '../../../packages/user/infrastructure/user_memory_data'
import { UUIDMother } from '../objects_mothers/shared/uuid_mother'
import { UserMother } from '../objects_mothers/users/user_mother'

describe( 'User Repository', () => {
	let repo: UserDao

	it( 'should update user', async () => {
		const authID1 = UUIDMother.random()
		const u1      = UserMother.random( authID1 )

		const authID2  = UUIDMother.random()
		const u2       = UserMother.random( authID2 )
		const db       = [ u1, u2 ]
		repo           = new UserMemoryData( db )

		const updated = new User(
			u2.auth_id,
			RUTMother.random(),
			ValidStringMother.random(),
			u2.email,
			RoleMother.random()
		)

		const result = await repo.update( u2.email, updated )

		const updatedUser = await repo.getOne( u2.email )

		console.log( 'should update user' )
		console.log( 'inputs:', db )
		console.log( 'result:', updatedUser )

		expect( result ).toBeTruthy()
		expect( updatedUser ).toEqual( updated )
	} )

	it( 'should create user', async () => {
		const authID1 = UUIDMother.random()
		const u1      = UserMother.random( authID1 )

		repo           = new UserMemoryData( [] )

		const create = await repo.create( u1 )

		const result = await repo.get( ValidInteger.from( 0 ), ValidInteger.from( 2 ) )

		console.log( 'should create user' )
		console.log( 'inputs:', u1 )
		console.log( 'result:', result )

		expect( create ).toBeTruthy()
		expect( result )
			.toHaveLength( 1 )
		expect( result )
			.toEqual( [ u1 ] )
	} )

	it( 'should delete user', async () => {
		const authID1 = UUIDMother.random()
		const u1      = UserMother.random( authID1 )

		const authID2  = UUIDMother.random()
		const u2       = UserMother.random( authID2 )
		const db       = [ u1, u2 ]
		const dbLength = db.length
		repo           = new UserMemoryData( db )

		await repo.delete( u2.email )

		const result = await repo.get( ValidInteger.from( 0 ),
			ValidInteger.from( dbLength ) )

		console.log( 'should delete user' )
		console.log( 'inputs:', db )
		console.log( 'result:', result )

		expect( result )
			.toHaveLength( 1 )
		expect( result )
			.toEqual( [ u1 ] )
	} )

	it( 'should get all users without filter', async () => {
		const authID1 = UUIDMother.random()
		const u1      = UserMother.random( authID1 )

		const authID2  = UUIDMother.random()
		const u2       = UserMother.random( authID2 )
		const db       = [ u1, u2 ]
		const dbLength = db.length
		repo           = new UserMemoryData( db )

		const result = await repo.get( ValidInteger.from( 0 ),
			ValidInteger.from( dbLength ) )

		console.log( 'should get all users' )
		console.log( 'inputs:', db )
		console.log( 'result:', result )

		expect( result )
			.toHaveLength( 2 )
		expect( result )
			.toEqual( [ u1, u2 ] )
	} )

	it( 'should get all users with role', async () => {
		const authID1 = UUIDMother.random()
		const u1 = new User(
			authID1,
			RUTMother.random(),
			ValidStringMother.random(),
			EmailMother.random(),
			Role.from('CLIENT')
		)

		const authID2  = UUIDMother.random()
		const u2 = new User(
			authID2,
			RUTMother.random(),
			ValidStringMother.random(),
			EmailMother.random(),
			Role.from('SELLER')
		)

		const authID3  = UUIDMother.random()
		const u3 = new User(
			authID3,
			RUTMother.random(),
			ValidStringMother.random(),
			EmailMother.random(),
			Role.from('ADMIN')
		)

		const db       = [ u1, u2 , u3]
		const dbLength = db.length
		repo           = new UserMemoryData( db )

		const result = await repo.get( ValidInteger.from( 0 ),
			ValidInteger.from( dbLength ), Role.from('ADMIN') )

		console.log( 'should get all users' )
		console.log( 'inputs:', db )
		console.log( 'result:', result )

		expect( result )
			.toHaveLength( 1 )
		expect( result )
			.toEqual( [ u3 ] )
	} )


	it( 'should get one user', async () => {
		const authID1 = UUIDMother.random()
		const u1      = UserMother.random( authID1 )

		const authID2  = UUIDMother.random()
		const u2       = UserMother.random( authID2 )
		const db       = [ u1, u2 ]
		repo           = new UserMemoryData( db )

		const result = await repo.getOne( u2.email )

		console.log( 'should get one user' )
		console.log( 'inputs:', db )
		console.log( 'result:', result )

		expect( result ).toEqual( u2 )
	} )
} )
