import { NewsLetterMockData } from '../../mock/news_letter_mock_data';
import { ValidInteger } from '../../../../packages/shared/domain/value_objects/valid_integer';
import { GetAllNewsLetter } from '../../../../packages/news_letter/application/get_all_news_letter';
import { NewsLettersMother } from '../../objects_mothers/news_letters/news_letters_mother';
import { Errors } from '../../../../packages/shared/domain/exceptions/errors';


describe( 'GetAllNewsLetterUnitTest', () => {

    it( 'get all news letters', async () => {
      const n1 = NewsLettersMother.random()
      const n2 = NewsLettersMother.random()
      const db = [n1,n2]
      const repo = new NewsLetterMockData(db)

      const from = ValidInteger.from(0)
      const to = ValidInteger.from(2)
      const name = undefined

      console.log('input get all:', from, to, name)
      const result = await GetAllNewsLetter( repo,{
        from: from.value,
        to: to.value,
        name
      } )

      repo.assertGetAllHasBeenCalledWith( from, to)
      expect( result ).toHaveLength(2)
      expect( result ).toBe( db )
    } )

    it( 'try get all news letters with invalid inputs', async () => {
      const repo = new NewsLetterMockData([])

      const result = await GetAllNewsLetter( repo, {
        from: -1,
        to: -10,
      } )

      if( result instanceof Errors ) {
        const errors = result.values.map( e => e.name)
        console.log('error:', errors)
      }
      expect( result ).toBeInstanceOf(Errors)
    } )
})