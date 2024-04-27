import { Test, TestingModule } from '@nestjs/testing';
import { CheckNewsLetterController } from './check-news-letter.controller';
import { CheckNewsLetterService } from './check-news-letter.service';

describe('CheckNewsLetterController', () => {
  let controller: CheckNewsLetterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckNewsLetterController],
      providers: [CheckNewsLetterService],
    }).compile();

    controller = module.get<CheckNewsLetterController>(CheckNewsLetterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
