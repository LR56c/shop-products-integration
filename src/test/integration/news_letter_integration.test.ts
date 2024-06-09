import { NewsLetterRepository } from '../../../packages/news_letter/domain/news_letter_repository'
import { NewsLetterMemoryData } from '../../../packages/news_letter/infrastructure/news_letter_memory_data'
import { ValidInteger } from '../../../packages/shared/domain/value_objects/valid_integer'
import { NewsLettersMother } from '../objects_mothers/news_letters/news_letters_mother'

describe( 'News Letter Repository', () => {
	let repo: NewsLetterRepository

	it( 'should check input newsletter', async () => {
		const n1 = NewsLettersMother.random()
		const n2 = NewsLettersMother.random()
		const db = [ n1, n2 ]
		repo = new NewsLetterMemoryData( db )

		const result = await repo.checkByEmail( n1.userEmail )

		console.log( 'should check input newsletter' )
		console.log( 'inputs:', db )
		console.log( 'result:', result )

		expect( result ).toBeTruthy()
	})

	it( 'should get all newsletters', async () => {
		const n1 = NewsLettersMother.random()
		const n2 = NewsLettersMother.random()
		const db = [ n1, n2 ]
		repo = new NewsLetterMemoryData( db )

		const newsLetters = await repo.getAll( ValidInteger.from( 0 ),
			ValidInteger.from( db.length ) )

		console.log( 'should get all newsletters' )
		console.log( 'inputs:', db )
		console.log( 'result:', newsLetters )

		expect( newsLetters ).toHaveLength( db.length )
		expect( newsLetters ).toEqual( db )
	})

	it( 'should be added newsletter', async () => {
		repo = new NewsLetterMemoryData( [] )

		const n1 = NewsLettersMother.random()
		const result = await repo.add( n1 )

		const newsLetters = await repo.getAll( ValidInteger.from( 0 ),
			ValidInteger.from( 2 ) )

		console.log( 'should be added newsletter' )
		console.log( 'inputs:', n1 )
		console.log( 'result:', newsLetters )

		expect( result ).toBeTruthy()
		expect( newsLetters ).toHaveLength( 1 )
		expect( newsLetters ).toEqual( [ n1 ] )
	} )

	it( 'should be remove newsletter', async () => {
		const n1 = NewsLettersMother.random()
		const db = [ n1 ]
		repo = new NewsLetterMemoryData( db )

		const result = await repo.remove( n1.userEmail )

		const newsLetters = await repo.getAll( ValidInteger.from( 0 ),
			ValidInteger.from( db.length ) )

		console.log( 'should be remove newsletter' )
		console.log( 'inputs:', db )
		console.log( 'result:', newsLetters )

		expect( result ).toBeTruthy()
		expect( newsLetters ).toHaveLength( 0 )
	} )
} )
