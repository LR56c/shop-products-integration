import { Test, TestingModule } from '@nestjs/testing';
import { AddRankService } from './add-rank.service';

describe('AddRankService', () => {
  let service: AddRankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddRankService],
    }).compile();

    service = module.get<AddRankService>(AddRankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
