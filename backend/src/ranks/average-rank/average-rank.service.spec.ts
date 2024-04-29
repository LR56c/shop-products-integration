import { Test, TestingModule } from '@nestjs/testing';
import { AverageRankService } from './average-rank.service';

describe('AverageRankService', () => {
  let service: AverageRankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AverageRankService],
    }).compile();

    service = module.get<AverageRankService>(AverageRankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
