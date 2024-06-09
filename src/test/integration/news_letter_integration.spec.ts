import { NewsLetterRepository } from 'packages/news_letter/domain/news_letter_repository'
import { NewsLetterMemoryData } from 'packages/news_letter/infrastructure/news_letter_memory_data'

// add
// delete
// get all
// get
describe( 'News Letter Repository', () => {
	let repo: NewsLetterRepository = new NewsLetterMemoryData( new Map() )

	// beforeEach( async () => {
	// } )

	it( 'should be defined', () => {
		expect( repo ).toBeDefined()
	} )
} )
