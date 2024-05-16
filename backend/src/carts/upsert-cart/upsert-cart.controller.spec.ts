import { Test, TestingModule } from '@nestjs/testing';
import { UpsertCartController } from './upsert-cart.controller';
import { UpsertCartService } from './upsert-cart.service';

describe('UpsertCartController', () => {
  let controller: UpsertCartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpsertCartController],
      providers: [UpsertCartService],
    }).compile();

    controller = module.get<UpsertCartController>(UpsertCartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
