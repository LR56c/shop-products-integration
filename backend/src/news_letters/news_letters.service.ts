import { Injectable } from '@nestjs/common';
import { NewsLetter } from '~features/news_letter/domain/models/NewsLetter'
import { NewsLetterRepository } from '~features/news_letter/domain/repository/NewsLetterRepository'
import { CreateNewsLetterDto } from './dto/create-news_letter.dto';
import { UpdateNewsLetterDto } from './dto/update-news_letter.dto';

@Injectable()
export class NewsLettersService {
  constructor(private repository : NewsLetterRepository) {}

  create(createNewsLetterDto: CreateNewsLetterDto) {
    return 'This action adds a new newsLetter';
  }

  async findAll() : Promise<NewsLetter[]> {
    return this.repository.getAll()
  }

  findOne(id: number) {
    return `This action returns a #${id} newsLetter`;
  }

  update(id: number, updateNewsLetterDto: UpdateNewsLetterDto) {
    return `This action updates a #${id} newsLetter`;
  }

  remove(id: number) {
    return `This action removes a #${id} newsLetter`;
  }
}
