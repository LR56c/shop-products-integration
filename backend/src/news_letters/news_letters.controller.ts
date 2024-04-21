import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsLettersService } from './news_letters.service';
import { CreateNewsLetterDto } from './dto/create-news_letter.dto';
import { UpdateNewsLetterDto } from './dto/update-news_letter.dto';

@Controller('news-letters')
export class NewsLettersController {
  constructor(private readonly newsLettersService: NewsLettersService) {}

  @Post()
  create(@Body() createNewsLetterDto: CreateNewsLetterDto) {
    return this.newsLettersService.create(createNewsLetterDto);
  }

  @Get()
  findAll() {
    return this.newsLettersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsLettersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsLetterDto: UpdateNewsLetterDto) {
    return this.newsLettersService.update(+id, updateNewsLetterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsLettersService.remove(+id);
  }
}
