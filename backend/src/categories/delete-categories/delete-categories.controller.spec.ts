import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCategoriesController } from './delete-categories.controller';
import { DeleteCategoriesService } from './delete-categories.service';

describe('DeleteCategoriesController', () => {
  let controller: DeleteCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteCategoriesController],
      providers: [DeleteCategoriesService],
    }).compile();

    controller = module.get<DeleteCategoriesController>(DeleteCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
