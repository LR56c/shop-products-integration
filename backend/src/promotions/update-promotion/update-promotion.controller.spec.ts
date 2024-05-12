import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePromotionController } from './update-promotion.controller';
import { UpdatePromotionService } from './update-promotion.service';

describe('UpdatePromotionController', () => {
  let controller: UpdatePromotionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdatePromotionController],
      providers: [UpdatePromotionService],
    }).compile();

    controller = module.get<UpdatePromotionController>(UpdatePromotionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
