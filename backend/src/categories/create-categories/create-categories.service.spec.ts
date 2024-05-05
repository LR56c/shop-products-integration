import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoriesService } from './create-categories.service';

describe('CreateCategoriesService', () => {
  let service: CreateCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCategoriesService],
    }).compile();

    service = module.get<CreateCategoriesService>(CreateCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
