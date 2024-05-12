import { Test, TestingModule } from '@nestjs/testing';
import { DeletePromotionController } from './delete-promotion.controller';
import { DeletePromotionService } from './delete-promotion.service';

describe('DeletePromotionController', () => {
  let controller: DeletePromotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeletePromotionController],
      providers: [DeletePromotionService],
    }).compile();

    controller = module.get<DeletePromotionController>(DeletePromotionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
