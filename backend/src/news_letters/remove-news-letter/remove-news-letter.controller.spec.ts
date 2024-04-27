import { Test, TestingModule } from '@nestjs/testing';
import { RemoveNewsLetterController } from './remove-news-letter.controller';
import { RemoveNewsLetterService } from './remove-news-letter.service';

describe('RemoveNewsLetterController', () => {
  let controller: RemoveNewsLetterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoveNewsLetterController],
      providers: [RemoveNewsLetterService],
    }).compile();

    controller = module.get<RemoveNewsLetterController>(RemoveNewsLetterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
