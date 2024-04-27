import { Test, TestingModule } from '@nestjs/testing';
import { GetAllNewsLetterService } from './get-all-news-letter.service';

describe('GetAllNewsLetterService', () => {
  let service: GetAllNewsLetterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllNewsLetterService],
    }).compile();

    service = module.get<GetAllNewsLetterService>(GetAllNewsLetterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
