import { Test, TestingModule } from '@nestjs/testing';
import { NewsLettersService } from './news_letters.service';

describe('NewsLettersService', () => {
  let service: NewsLettersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsLettersService],
    }).compile();

    service = module.get<NewsLettersService>(NewsLettersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
