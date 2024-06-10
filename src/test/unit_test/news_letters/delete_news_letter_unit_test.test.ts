import { EmailMother } from '../../objects_mothers/shared/email_mother';
import { NewsLetterMockData } from '../../mock/news_letter_mock_data';
import { DeleteNewsLetter } from '../../../../packages/news_letter/application/delete_news_letter';
import { Errors } from '../../../../packages/shared/domain/exceptions/errors';

describe( 'DeleteNewsLetterUnitTest', () => {

  it( 'delete a news letter', async () => {
    const repo = new NewsLetterMockData([])
    const e1 = EmailMother.random()

    console.log('input delete:', e1.value)
    const result = await DeleteNewsLetter( repo, e1.value)

    repo.assertDeletedHasBeenCalledWith( e1)
    expect( result ).toBe( true )
  })

  it( 'try delete a news letter with invalid inputs', async () => {
    const repo = new NewsLetterMockData([])
    const result = await DeleteNewsLetter( repo, '')

    if( result instanceof Errors ) {
      const errors = result.values.map( e => e.name)
      console.log('error:', errors)
    }
    expect( result ).toBeInstanceOf(Errors)
  })
})