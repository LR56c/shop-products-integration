import { UserDao } from 'packages/user/domain/dao/UserDao'
import { UserMemoryData } from 'packages/user/infrastructure/user_memory_data'

// get one
// get user (all)
// update
describe( 'User Repository', () => {
	let repo: UserDao = new UserMemoryData( new Map() )

	// beforeEach( async () => {
	// } )

	it( 'should be defined', () => {
		expect( repo )
			.toBeDefined()
	} )
} )
