import { NewsLetterMockData } from '../../mock/news_letter_mock_data';
import { NewsLettersMother } from '../../objects_mothers/news_letters/news_letters_mother';
import { GetNewsLetter } from '../../../../packages/news_letter/application/get_news_letter';
import { Errors } from '../../../../packages/shared/domain/exceptions/errors';

describe('CheckByEmailNewsLetterUnitTest', () => {

  it('check by email news letter', async () => {

    const n1 = NewsLettersMother.random()
    const repo = new NewsLetterMockData([n1])
    console.log('input check by email:', n1.userEmail.value);

    const result = await GetNewsLetter( repo, n1.userEmail.value)

    repo.assertGetOneHasBeenCalledWith( n1.userEmail)
    expect( result ).toBe( true )
  })

  it('try check by email news letter with invalid inputs', async () => {
    const repo = new NewsLetterMockData([])

    const result = await GetNewsLetter( repo, '')

    if (result instanceof Errors) {
      const errors = result.values.map( e => e.name)
      console.log('error:', errors)
    }
    expect( result ).toBeInstanceOf(Errors)
  })
})