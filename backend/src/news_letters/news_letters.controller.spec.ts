import { Test, TestingModule } from '@nestjs/testing';
import { NewsLettersController } from './news_letters.controller';
import { NewsLettersService } from './news_letters.service';

describe('NewsLettersController', () => {
  let controller: NewsLettersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsLettersController],
      providers: [NewsLettersService],
    }).compile();

    controller = module.get<NewsLettersController>(NewsLettersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
