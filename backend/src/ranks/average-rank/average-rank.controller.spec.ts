import { Test, TestingModule } from '@nestjs/testing';
import { AverageRankController } from './average-rank.controller';
import { AverageRankService } from './average-rank.service';

describe('AverageRankController', () => {
  let controller: AverageRankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AverageRankController],
      providers: [AverageRankService],
    }).compile();

    controller = module.get<AverageRankController>(AverageRankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
