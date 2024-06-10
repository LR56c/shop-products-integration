import { NewsLetterMockData } from '../../mock/news_letter_mock_data';
import { AddNewsLetter } from '../../../../packages/news_letter/application/add_news_letter';
import { NewsLettersMother } from '../../objects_mothers/news_letters/news_letters_mother';
import { Errors } from '../../../../packages/shared/domain/exceptions/errors';

describe('CreateNewsLetterUnitTest', () => {
  it('Should Create News Letter', async () => {

    const repo = new NewsLetterMockData([])
    const n1 = NewsLettersMother.random()

    console.log('input create:', n1)
    const result = await AddNewsLetter( repo, {
      userEmail: n1.userEmail.value,
      name: n1.name.value,
      createdAt: n1.createdAt.value
    })
    repo.assertCreatedHasBeenCalledWith(n1)
    expect(result).toBe(true)
  })

  it('Should Try Create News Letter With Invalid Inputs', async () => {
    const repo = new NewsLetterMockData([])

    const result = await AddNewsLetter( repo, {
      userEmail: '',
      name: '',
      createdAt: ''
    })
    if(result instanceof Errors ) {
      const errors = result.values.map( e => e.name)
      console.log('error:', errors)
    }
    expect(result).toBeInstanceOf(Errors)
  })
})