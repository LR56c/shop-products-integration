import { Test, TestingModule } from '@nestjs/testing';
import { GetCategoriesService } from './get-categories.service';

describe('GetCategoriesService', () => {
  let service: GetCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCategoriesService],
    }).compile();

    service = module.get<GetCategoriesService>(GetCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
