import { NewsLetterRepository } from '../../../packages/news_letter/domain/news_letter_repository';
import { NewsLetter } from '../../../packages/news_letter/domain/news_letter';
import { ValidInteger } from '../../../packages/shared/domain/value_objects/valid_integer';
import { ValidString } from '../../../packages/shared/domain/value_objects/valid_string';
import { Email } from '../../../packages/shared/domain/value_objects/email';

export class NewsLetterMockData implements NewsLetterRepository {
  private mockCreate      = jest.fn()
  private mockGetAll      = jest.fn()
  private mockGet      = jest.fn()
  private mockDelete      = jest.fn()

  constructor(private db: Array<NewsLetter>) {}

  async add( newsLetter: NewsLetter ): Promise<boolean> {
    this.mockCreate( newsLetter )
    console.log('result create:', newsLetter)
    return true
  }

  assertCreatedHasBeenCalledWith(newsLetter : NewsLetter) {
    expect(this.mockCreate).toHaveBeenCalledWith(newsLetter);
  }

  async getAll( from: ValidInteger, to: ValidInteger, name?: ValidString | undefined ): Promise<NewsLetter[]> {
    this.mockGetAll( from, to, name )
    console.log('result get:', from, to, name)
    return this.db
  }

  assertGetAllHasBeenCalledWith(from : ValidInteger, to : ValidInteger, name?: ValidString | undefined) {
    expect(this.mockGetAll).toHaveBeenCalledWith(from, to, name);
  }

  async checkByEmail( email: Email ): Promise<boolean> {
    this.mockGet( email )
    console.log('result get:', email)
    return true
  }

  assertGetOneHasBeenCalledWith(email : Email) {
    expect(this.mockGet).toHaveBeenCalledWith(email);
  }


  async remove( email: Email): Promise<boolean> {
    this.mockDelete( email )
    console.log('result delete:', email)
    return true
  }

  assertDeletedHasBeenCalledWith(name : Email) {
    expect(this.mockDelete).toHaveBeenCalledWith(name);
  }
}